export const pwaManifest = {
  id: '/',
  name: 'Scan & Connect',
  short_name: 'Scan & Connect',
  description: 'Open Joydip Ghosh\'s personal connection QR code.',
  theme_color: '#0B0F19',
  background_color: '#0B0F19',
  display: 'standalone',
  start_url: '/',
  scope: '/',
  lang: 'en',
  categories: ['utilities'],
  prefer_related_applications: false,
  icons: [
    { src: '/pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: '/pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
};

export function isStandalonePwa() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}
