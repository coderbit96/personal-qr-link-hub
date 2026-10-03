import { ArrowUpRight, Globe2 } from 'lucide-react';
import { gsap } from 'gsap';
import { getSafeHttpsUrl } from '../utils/url';

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="18" height="18" x="3" y="3" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.65 21v-8.2h2.76l.41-3.2h-3.17V7.56c0-.93.26-1.56 1.59-1.56h1.7V3.14A22.8 22.8 0 0 0 14.46 3c-2.45 0-4.13 1.5-4.13 4.25V9.6H7.56v3.2h2.77V21h3.32Z" />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.938v5.668H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.5-4.7a8.5 8.5 0 1 1 16-4.3Z" />
      <path d="M8.1 8.3c.3-.5.7-.6 1.1-.1l1.1 1.3c.2.3.2.6-.1.9l-.5.5a7 7 0 0 0 3.4 3.4l.5-.5c.3-.3.6-.3.9-.1l1.4 1c.5.4.4.8 0 1.2-.7.8-1.5 1-2.5.7a10 10 0 0 1-6-6c-.3-1 .1-1.8.7-2.9Z" />
    </svg>
  );
}

const iconMap = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  whatsapp: WhatsAppIcon,
  globe: Globe2,
};

export default function SocialLinkCard({ link }) {
  const Icon = iconMap[link.icon] || Globe2;
  const safeUrl = getSafeHttpsUrl(link.url);

  const animate = (event, scale, y = 0) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.to(event.currentTarget, { scale, y, duration: 0.22, ease: 'power2.out', overwrite: true });
  };

  if (!safeUrl) return null;

  return (
    <a
      className={`social-card group social-card--${link.id} flex min-h-[84px] w-full items-center gap-4 rounded-2xl border p-4 text-left sm:p-[18px]`}
      href={safeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${link.title}: ${link.description} (opens in a new tab)`}
      onMouseEnter={(event) => animate(event, 1.018, -2)}
      onMouseLeave={(event) => animate(event, 1, 0)}
      onPointerDown={(event) => animate(event, 0.985, 0)}
      onPointerUp={(event) => animate(event, 1.018, -2)}
    >
      <span className="card-icon grid h-12 w-12 shrink-0 place-items-center rounded-xl" aria-hidden="true">
        <Icon size={22} strokeWidth={1.8} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[17px] font-semibold text-white">{link.title}</span>
        <span className="mt-1 block text-[13px] text-slate-400">{link.description}</span>
      </span>
      <span className="card-arrow grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-500 transition-colors group-hover:text-white" aria-hidden="true">
        <ArrowUpRight size={18} />
      </span>
    </a>
  );
}
