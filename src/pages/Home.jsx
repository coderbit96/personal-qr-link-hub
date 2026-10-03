import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ProfileHeader from '../components/ProfileHeader';
import SocialLinkCard from '../components/SocialLinkCard';
import { profileConfig } from '../config/links';
import { usePageMetadata } from '../hooks/usePageMetadata';

export default function Home() {
  const pageRef = useRef(null);
  const enabledLinks = profileConfig.links.filter((link) => link.enabled);

  usePageMetadata({
    title: `${profileConfig.name} — ${profileConfig.description}`,
    description: `${profileConfig.bio} Connect on social media and explore my portfolio.`,
  });

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline
        .from('.profile-avatar', { scale: 0.75, opacity: 0, duration: 0.7 })
        .from('.eyebrow, .profile-header h1, .profile-bio', { y: 16, opacity: 0, duration: 0.55, stagger: 0.08 }, '-=0.4')
        .from('.heading-block', { y: 14, opacity: 0, duration: 0.45 }, '-=0.25')
        .from('.social-card', { y: 22, scale: 0.985, duration: 0.55, stagger: 0.1, clearProps: 'transform' }, '-=0.2')
        .from('.footer-note', { y: 8, duration: 0.4, clearProps: 'transform' }, '-=0.15');
    }, pageRef);

    return () => context.revert();
  }, []);

  return (
    <main ref={pageRef} className="page-shell relative mx-auto flex min-h-dvh w-full max-w-[450px] flex-col px-5 py-10 sm:px-0 sm:py-14">
      <ProfileHeader profile={profileConfig} />
      <nav className="mt-6 flex flex-col gap-3.5" aria-label="Social links">
        {enabledLinks.map((link) => <SocialLinkCard key={link.id} link={link} />)}
      </nav>
      <p className="footer-note mt-auto pt-9 text-center text-xs text-slate-600">
        Designed with intention · Built for connection
      </p>
    </main>
  );
}
