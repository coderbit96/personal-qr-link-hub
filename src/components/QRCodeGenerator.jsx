import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import QRCode from 'qrcode';

const QR_OPTIONS = {
  errorCorrectionLevel: 'H',
  margin: 6,
  width: 1024,
  color: { dark: '#07101F', light: '#FFFFFF' },
};

export default function QRCodeGenerator({ url }) {
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!url || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, url, QR_OPTIONS).catch(() => {
      setError('The QR code could not be generated. Please verify the URL and try again.');
    });
  }, [url]);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError('Copy failed. Select the URL below and copy it manually.');
    }
  };

  const downloadQr = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(url, { ...QR_OPTIONS, width: 1600 });
      const anchor = document.createElement('a');
      anchor.href = dataUrl;
      anchor.download = 'personal-link-hub-qr.png';
      anchor.click();
    } catch {
      setError('The PNG could not be prepared. Please try again.');
    }
  };

  return (
    <section className="qr-card rounded-[28px] border border-white/10 bg-panel/90 p-5 shadow-glow sm:p-7" aria-labelledby="qr-title">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Ready to scan</p>
          <h1 id="qr-title" className="font-display text-2xl font-bold text-white">Your connection QR</h1>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300" title="Secure HTTPS URL">
          <ShieldCheck size={21} aria-hidden="true" />
        </span>
      </div>

      <div className="qr-frame mx-auto w-full max-w-[310px] rounded-[24px] bg-white p-3.5 sm:p-4">
        <canvas ref={canvasRef} className="qr-canvas block" aria-label={`QR code for ${url}`} />
      </div>

      <div className="mt-5 rounded-2xl border border-white/[0.07] bg-black/20 p-3.5">
        <p className="mb-1.5 text-xs font-medium text-slate-500">Landing page URL</p>
        <div className="flex items-center gap-2">
          <a href={url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 truncate text-sm text-blue-300 hover:text-blue-200">
            {url}
          </a>
          <ExternalLink size={15} className="shrink-0 text-slate-500" aria-hidden="true" />
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-rose-300" role="alert">{error}</p>}

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button type="button" onClick={downloadQr} className="button-primary flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-white">
          <Download size={17} aria-hidden="true" /> Download PNG
        </button>
        <button type="button" onClick={copyUrl} className="button-secondary flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-semibold text-slate-200">
          {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy URL'}
        </button>
      </div>
      <p className="mt-4 text-center text-xs leading-5 text-slate-500">High-contrast PNG · 1600 × 1600 · Error correction level H</p>
    </section>
  );
}
