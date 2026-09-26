# Portfolio Contact Worker

This Worker receives contact form submissions, limits each IP address to one request per 60 seconds with a Durable Object, and forwards valid messages to EmailJS.

## Setup

From this directory:

```powershell
npx wrangler login
npx wrangler deploy
```

The Durable Object migration is created automatically during deployment.

Set the EmailJS values as Worker secrets:

```powershell
npx wrangler secret put EMAILJS_SERVICE_ID
npx wrangler secret put EMAILJS_TEMPLATE_ID
npx wrangler secret put EMAILJS_PUBLIC_KEY
```

Run locally:

```powershell
npx wrangler dev
```

Deploy:

```powershell
npx wrangler deploy
```

The deployed endpoint will be:

```text
https://portfolio-contact-api.<your-subdomain>.workers.dev/api/contact
```

Set that URL as `REACT_APP_CONTACT_API_URL` when building the React app. Do not commit the KV namespace ID if this repository is public unless you are comfortable exposing it; KV IDs are not credentials, but keeping deployment configuration private is cleaner.
