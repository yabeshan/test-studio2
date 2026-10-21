import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isIPad, setIsIPad] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect standalone mode (already on Home Screen)
    const nav = window.navigator as unknown as { standalone?: boolean };
    const standaloneMode =
      nav.standalone === true ||
      (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
    setIsStandalone(Boolean(standaloneMode));

    // Detect iPad & iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isIPadUA = /ipad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isIOSDevice = /iphone|ipad|ipod/.test(ua) || isIPadUA;
    setIsIPad(isIPadUA);
    setIsIOS(isIOSDevice);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsStandalone(true);
      setDeferredPrompt(null);
      return true;
    }
    return false;
  };

  return {
    isInstallable: !!deferredPrompt,
    isStandalone,
    isIOS,
    isIPad,
    install,
  };
}
