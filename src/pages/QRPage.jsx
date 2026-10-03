import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Link2, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import QRCodeGenerator from '../components/QRCodeGenerator';
import { profileConfig } from '../config/links';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { getProductionLandingUrl, getSafeHttpsUrl } from '../utils/url';

export default function QRPage() {
  const pageRef = useRef(null);
  const [landingUrl, setLandingUrl] = useState(() => getProductionLandingUrl(profileConfig.siteUrl));
  const [draftUrl, setDraftUrl] = useState(landingUrl);
  const [validationMessage, setValidationMessage] = useState('');

  usePageMetadata({
    title: `QR Code — ${profileConfig.name}`,
    description: `Scan, share, or download a QR code to open ${profileConfig.name}'s social link hub.`,
  });

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const context = gsap.context(() => {
      gsap.from('.qr-entrance', { y: 24, duration: 0.65, ease: 'power3.out', stagger: 0.1, clearProps: 'transform' });
    }, pageRef);
    return () => context.revert();
  }, []);

  const saveUrl = (event) => {
    event.preventDefault();
    const safeUrl = getSafeHttpsUrl(draftUrl);
    if (!safeUrl || ['localhost', '127.0.0.1', '[::1]'].includes(new URL(safeUrl).hostname)) {
      setValidationMessage('Enter the HTTPS URL of your deployed site. Localhost is not allowed.');
      return;
    }

    const normalized = new URL('/links', safeUrl).href;
    localStorage.setItem('qrhub:site-url', normalized);
    setLandingUrl(normalized);
    setDraftUrl(normalized);
    setValidationMessage('Saved in this browser. The QR code is now ready.');
  };

  return (
    <main ref={pageRef} className="page-shell relative mx-auto min-h-dvh w-full max-w-[450px] px-5 py-8 sm:px-0 sm:py-12">
      <div className="qr-entrance mb-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">Joydip Ghosh · Digital connection card</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white">Scan to connect</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-400">Point your phone camera at the code to open my social links and portfolio.</p>
      </div>

      {landingUrl ? (
        <div className="qr-entrance"><QRCodeGenerator url={landingUrl} /></div>
      ) : (
        <section className="qr-entrance rounded-[28px] border border-white/10 bg-panel/90 p-6 shadow-glow sm:p-8">
          <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-blue-500/10 text-blue-300"><Link2 size={23} /></span>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">One-time setup</p>
          <h1 className="mt-2 font-display text-2xl font-bold text-white">Add your public website URL</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            QR generation is paused on localhost to prevent an unusable code. Enter your deployed Vercel or custom-domain URL below.
          </p>

          <form className="mt-6" onSubmit={saveUrl} noValidate>
            <label htmlFor="landing-url" className="mb-2 block text-sm font-medium text-slate-300">Deployed website URL</label>
            <input
              id="landing-url"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://your-project.vercel.app"
              value={draftUrl}
              onChange={(event) => setDraftUrl(event.target.value)}
              className="url-input min-h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-400/70"
              required
            />
            {validationMessage && <p className="mt-2 text-sm text-blue-200" role="status">{validationMessage}</p>}
            <button type="submit" className="button-primary mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white">
              <Save size={17} aria-hidden="true" /> Save and generate QR
            </button>
          </form>
          <p className="mt-5 text-xs leading-5 text-slate-500">
            The QR always points to the <code className="text-slate-400">/links</code> page on the deployed site.
          </p>
        </section>
      )}
      <Link to="/links" className="qr-entrance mt-5 flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/[0.08]">
        Open my link card <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
      <p className="qr-entrance mt-3 text-center text-xs leading-5 text-slate-500">Viewing this on the same phone? Tap the link card button above.</p>
    </main>
  );
}
