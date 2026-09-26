const http = require('http');

const PORT = Number(process.env.PORT || 4000);
const WINDOW_MS = 60 * 1000;
const MAX_BODY_BYTES = 20 * 1024;
const allowedOrigins = new Set([
  'http://localhost:3000',
  'https://frankangelocalumay.github.io'
]);
const requestLog = new Map();

const sendJson = (response, statusCode, body, headers = {}) => {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    ...headers
  });
  response.end(JSON.stringify(body));
};

const getClientIp = (request) => request.socket.remoteAddress || 'unknown';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const readJsonBody = (request) => new Promise((resolve, reject) => {
  let body = '';
  let size = 0;

  request.on('data', (chunk) => {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      reject(new Error('PAYLOAD_TOO_LARGE'));
      request.destroy();
      return;
    }
    body += chunk;
  });

  request.on('end', () => {
    try {
      resolve(JSON.parse(body));
    } catch {
      reject(new Error('INVALID_JSON'));
    }
  });

  request.on('error', reject);
});

const sendEmail = async ({ name, email, subject, message }) => {
  const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } = process.env;
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error('EMAIL_SERVICE_NOT_CONFIGURED');
  }

  const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: { name, email, subject, message }
    })
  });

  if (!emailResponse.ok) {
    throw new Error('EMAIL_PROVIDER_ERROR');
  }
};

const server = http.createServer(async (request, response) => {
  const origin = request.headers.origin;
  const corsHeaders = allowedOrigins.has(origin)
    ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' }
    : {};

  if (request.method === 'OPTIONS') {
    sendJson(response, 204, {}, {
      ...corsHeaders,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return;
  }

  if (request.method !== 'POST' || request.url !== '/api/contact') {
    sendJson(response, 404, { error: 'Not found.' }, corsHeaders);
    return;
  }

  const ip = getClientIp(request);
  const now = Date.now();
  const lastRequest = requestLog.get(ip);
  if (lastRequest && now - lastRequest < WINDOW_MS) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - lastRequest)) / 1000);
    sendJson(response, 429, {
      error: 'Please wait before sending another message.'
    }, { ...corsHeaders, 'Retry-After': String(retryAfter) });
    return;
  }

  try {
    const payload = await readJsonBody(request);
    const { name, email, subject, message } = payload;

    if (
      typeof name !== 'string' || name.trim().length < 1 || name.length > 100 ||
      typeof email !== 'string' || !isValidEmail(email) || email.length > 254 ||
      typeof subject !== 'string' || subject.trim().length < 1 || subject.length > 150 ||
      typeof message !== 'string' || message.trim().length < 10 || message.length > 5000
    ) {
      sendJson(response, 400, { error: 'Please provide valid contact details and a message.' }, corsHeaders);
      return;
    }

    requestLog.set(ip, now);
    await sendEmail({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim()
    });

    sendJson(response, 200, { message: 'Message sent successfully.' }, corsHeaders);
  } catch (error) {
    if (error.message === 'PAYLOAD_TOO_LARGE') {
      sendJson(response, 413, { error: 'Request is too large.' }, corsHeaders);
      return;
    }
    if (error.message === 'INVALID_JSON') {
      sendJson(response, 400, { error: 'Request must contain valid JSON.' }, corsHeaders);
      return;
    }
    console.error('Contact endpoint error:', error.message);
    sendJson(response, 500, { error: 'Unable to send your message right now.' }, corsHeaders);
  }
});

server.listen(PORT, () => {
  console.log(`Contact API listening on http://localhost:${PORT}`);
});
