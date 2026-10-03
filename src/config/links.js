export const profileConfig = {
  name: 'Joydip Ghosh',
  title: 'Full Stack Developer',
  profileImage: '/profile.jpg',
  description: "Let's Connect!",

  // Keep printed QR codes tied to the stable production domain, even on preview deployments.
  siteUrl: import.meta.env.VITE_PUBLIC_SITE_URL || 'https://scan-joydip.vercel.app',

  links: [
    {
      id: 'instagram',
      title: 'Instagram Profile',
      description: 'Follow me on Instagram',
      url: 'https://www.instagram.com/joydip.88/',
      icon: 'instagram',
      enabled: true,
    },
    {
      id: 'facebook',
      title: 'Facebook Profile',
      description: 'Connect with me on Facebook',
      url: 'https://www.facebook.com/joydip.ghosh.986227',
      icon: 'facebook',
      enabled: true,
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Profile',
      description: 'Connect with me professionally',
      url: 'https://www.linkedin.com/in/joydip-ghosh-83073033a/',
      icon: 'linkedin',
      enabled: true,
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      description: 'Chat with me on WhatsApp',
      url: 'https://wa.me/919641212416',
      icon: 'whatsapp',
      enabled: true,
    },
    {
      id: 'portfolio',
      title: 'My Portfolio',
      description: 'Explore my projects and work',
      url: 'https://www.automade.in/',
      icon: 'globe',
      enabled: true,
    },
  ],
};
