# Dynamic QR Personal Link Hub

A mobile-first React landing page with safe social links and a production-ready downloadable QR code.

## Run locally

```bash
npm install
npm run dev
```

Open `/` for the link hub and `/qr` for the QR generator. Localhost is deliberately rejected as a QR destination; enter a deployed HTTPS URL on the QR page or set `VITE_PUBLIC_SITE_URL`.

## Customize

Edit `src/config/links.js` to change the profile content, enable/disable cards, or update destinations. Only valid HTTPS URLs are rendered.

Replace `public/profile.jpg` with your own optimized square portrait. Keep the filename unchanged or update `profileImage` in the config.

## Deploy to Vercel

Import the repository in Vercel and deploy with the default Vite settings. The included `vercel.json` keeps `/qr` working on direct visits. On Vercel, the QR generator automatically uses the current deployed HTTPS origin. To pin it to a custom domain, add:

```text
VITE_PUBLIC_SITE_URL=https://your-domain.com
```

Because the QR points to the landing page rather than an individual social URL, social destinations can be updated and redeployed without replacing the printed QR.
