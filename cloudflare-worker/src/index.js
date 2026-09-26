const WINDOW_SECONDS = 60;
const MAX_BODY_BYTES = 20 * 1024;

const json = (body, status, headers = {}) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    ...headers
  }
});

const corsHeaders = (origin, allowedOrigin) => {
  const allowedOrigins = allowedOrigin.split(',').map((item) => item.trim());
  if (!origin || !allowedOrigins.includes(origin)) {
    return {};
  }

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin'
  };
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const hashIp = async (ip) => {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(ip)
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

export class RateLimiter {
  constructor(state) {
    this.state = state;
  }

  async fetch() {
    let response;

    await this.state.blockConcurrencyWhile(async () => {
      const lastRequestAt = await this.state.storage.get('lastRequestAt');
      const elapsed = lastRequestAt ? Date.now() - lastRequestAt : WINDOW_SECONDS * 1000;

      if (elapsed < WINDOW_SECONDS * 1000) {
        response = new Response(null, {
          status: 429,
          headers: { 'Retry-After': String(Math.ceil((WINDOW_SECONDS * 1000 - elapsed) / 1000)) }
        });
        return;
      }

      await this.state.storage.put('lastRequestAt', Date.now(), {
        expirationTtl: WINDOW_SECONDS
      });
      response = new Response(null, { status: 204 });
    });

    return response;
  }
}

const readPayload = async (request) => {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    throw new Error('PAYLOAD_TOO_LARGE');
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) {
    throw new Error('PAYLOAD_TOO_LARGE');
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error('INVALID_JSON');
  }
};

const sendEmail = async (payload, env) => {
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: env.EMAILJS_SERVICE_ID,
      template_id: env.EMAILJS_TEMPLATE_ID,
      user_id: env.EMAILJS_PUBLIC_KEY,
      accessToken: env.EMAILJS_PRIVATE_KEY,
      template_params: payload
    })
  });

  if (!response.ok) {
    throw new Error('EMAIL_PROVIDER_ERROR');
  }
};

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const headers = corsHeaders(origin, env.ALLOWED_ORIGIN);
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    if (origin && !env.ALLOWED_ORIGIN.split(',').map((item) => item.trim()).includes(origin)) {
      return json({ error: 'Origin not allowed.' }, 403);
    }

    if (request.method !== 'POST' || url.pathname !== '/api/contact') {
      return json({ error: 'Not found.' }, 404, headers);
    }

    try {
      const payload = await readPayload(request);
      const { name, email, subject, message, website } = payload;

      if (website) {
        return json({ message: 'Message sent successfully.' }, 200, headers);
      }

      if (
        typeof name !== 'string' || name.trim().length < 1 || name.length > 100 ||
        typeof email !== 'string' || !isValidEmail(email) || email.length > 254 ||
        typeof subject !== 'string' || subject.trim().length < 1 || subject.length > 150 ||
        typeof message !== 'string' || message.trim().length < 10 || message.length > 5000
      ) {
        return json({ error: 'Please provide valid contact details and a message.' }, 400, headers);
      }

      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      const limiterId = env.RATE_LIMITER.idFromName(await hashIp(ip));
      const limiter = env.RATE_LIMITER.get(limiterId);
      const rateLimitResponse = await limiter.fetch('https://rate-limit/check');

      if (!rateLimitResponse.ok) {
        return json({ error: 'Please wait before sending another message.' }, 429, {
          ...headers,
          'Retry-After': rateLimitResponse.headers.get('Retry-After') || String(WINDOW_SECONDS)
        });
      }

      await sendEmail({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim()
      }, env);

      return json({ message: 'Message sent successfully.' }, 200, headers);
    } catch (error) {
      if (error.message === 'PAYLOAD_TOO_LARGE') {
        return json({ error: 'Request is too large.' }, 413, headers);
      }
      if (error.message === 'INVALID_JSON') {
        return json({ error: 'Request must contain valid JSON.' }, 400, headers);
      }

      console.error('Contact Worker error:', error.message);
      return json({ error: 'Unable to send your message right now.' }, 500, headers);
    }
  }
};
