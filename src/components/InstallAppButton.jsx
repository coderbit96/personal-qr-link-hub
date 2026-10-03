import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

function isInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

export default function InstallAppButton() {
  const [installed, setInstalled] = useState(isInstalled);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const handleInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const handleInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
      setShowInstructions(false);
    };

    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) {
      setShowInstructions((current) => !current);
      return;
    }

    try {
      await installPrompt.prompt();
      await installPrompt.userChoice;
      setInstallPrompt(null);
    } catch {
      setShowInstructions(true);
    }
  };

  if (installed) return null;

  return (
    <div>
      <button
        type="button"
        className="install-button inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-5 text-xs font-semibold text-blue-200 transition-colors hover:border-blue-400/40 hover:bg-blue-500/15"
        onClick={handleInstall}
        aria-expanded={showInstructions}
        aria-controls={showInstructions ? 'install-instructions' : undefined}
      >
        <Download size={15} aria-hidden="true" /> Install app
      </button>
      {showInstructions && (
        <div id="install-instructions" className="mx-auto mt-3 max-w-sm rounded-2xl border border-white/10 bg-panel p-4 text-left text-xs leading-5 text-slate-300" role="status">
          <p><span className="font-semibold text-white">iPhone:</span> Tap Share in Safari, then Add to Home Screen.</p>
          <p className="mt-2"><span className="font-semibold text-white">Android:</span> Open your browser menu and choose Install app or Add to Home screen.</p>
        </div>
      )}
    </div>
  );
}
