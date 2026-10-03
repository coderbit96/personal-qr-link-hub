# Dynamic QR Personal Link Hub

A mobile-first React link card with a production-ready downloadable QR code.

## Run locally

```bash
npm install
npm run dev
```

Open `/` to see and download the QR code. Open `/links` for the social link card. `/qr` redirects to `/` for older bookmarks. The QR uses the configured public HTTPS domain, never localhost.

## Customize

Edit `src/config/links.js` to change the profile content, enable/disable cards, or update destinations. Only valid HTTPS URLs are rendered.

Replace `public/profile.jpg` with your own optimized square portrait. Keep the filename unchanged or update `profileImage` in the config.

## Deploy to Vercel

Import the repository in Vercel and deploy with the default Vite settings. The included `vercel.json` supports direct visits to both `/` and `/links`. The QR is pinned to `https://scan-joydip.vercel.app/links` on both production and preview deployments. To use another domain, edit `siteUrl` in `src/config/links.js` or set:

```text
VITE_PUBLIC_SITE_URL=https://your-domain.com
```

Share the Vercel root URL to show the QR code. Visitors can scan it with another phone, download its PNG, or use **Open my link card** when browsing on the same phone. A scan opens `/links`, where the five social/contact cards live. Because the QR points to the link card rather than an individual social URL, destinations can be updated and redeployed without replacing the printed QR, provided the site domain stays the same.

## Install on a phone

After deploying over HTTPS, open `/links` on your phone and tap **Install app**. On supported Android browsers, this opens the native install prompt. On iPhone, tap **Share → Add to Home Screen** in Safari. The installed app opens the link card and keeps both it and the QR route available offline after the first online visit. External social and portfolio destinations still need an internet connection.
