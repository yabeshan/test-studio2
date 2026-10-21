/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Maximize,
  Minimize,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { IOSInstallGuide } from './components/IOSInstallGuide';

interface ButtonState {
  id: number;
  label: string;
  count: number;
  active: boolean;
}

export default function App() {
  const [buttons, setButtons] = useState<ButtonState[]>([
    { id: 1, label: 'Кнопка 1', count: 0, active: false },
    { id: 2, label: 'Кнопка 2', count: 0, active: false },
    { id: 3, label: 'Кнопка 3', count: 0, active: false },
    { id: 4, label: 'Кнопка 4', count: 0, active: false },
    { id: 5, label: 'Кнопка 5', count: 0, active: false },
    { id: 6, label: 'Кнопка 6', count: 0, active: false },
  ]);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Subtle clean click sound via Web Audio API
  const playClick = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(540, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio not permitted or unsupported
    }
  };

  const handlePress = (id: number) => {
    playClick();
    setButtons((prev) =>
      prev.map((btn) =>
        btn.id === id
          ? { ...btn, count: btn.count + 1, active: !btn.active }
          : btn
      )
    );
  };

  const handleReset = () => {
    playClick();
    setButtons((prev) =>
      prev.map((btn) => ({ ...btn, count: 0, active: false }))
    );
  };

  // Fullscreen with WebKit/Safari fallback
  const toggleFullscreen = () => {
    if (typeof document === 'undefined') return;
    playClick();

    const doc = document as unknown as {
      fullscreenElement?: Element;
      webkitFullscreenElement?: Element;
      exitFullscreen?: () => Promise<void>;
      webkitExitFullscreen?: () => void;
    };
    const docEl = document.documentElement as unknown as {
      requestFullscreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => void;
    };

    const isCurrentlyFullscreen = Boolean(
      doc.fullscreenElement || doc.webkitFullscreenElement
    );

    if (!isCurrentlyFullscreen) {
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch(() => {});
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (doc.exitFullscreen) {
        doc.exitFullscreen().catch(() => {});
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      const doc = document as unknown as {
        fullscreenElement?: Element;
        webkitFullscreenElement?: Element;
      };
      setIsFullscreen(Boolean(doc.fullscreenElement || doc.webkitFullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-200 select-none ${
        isDark ? 'bg-black text-neutral-100' : 'bg-lime-50 text-neutral-900'
      }`}
    >
      {/* Top Row / Header */}
      <header
        className={`px-3 sm:px-6 py-3 flex items-center justify-between border-b transition-colors pt-safe flex-wrap gap-2.5 ${
          isDark ? 'border-neutral-900 bg-black' : 'border-neutral-200 bg-lime-50'
        }`}
      >
        <div
          className={`text-sm sm:text-base font-semibold tracking-wide ${
            isDark ? 'text-neutral-200' : 'text-neutral-800'
          }`}
        >
          Кнопки22
        </div>

        {/* Action Controls in Header */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Кнопка: Фуллскрин (На весь экран) */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Выйти из полноэкранного режима' : 'Включить полноэкранный режим'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-medium transition cursor-pointer active:scale-95 ${
              isFullscreen
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                : isDark
                ? 'bg-neutral-900 text-neutral-200 border-neutral-800 hover:bg-neutral-800'
                : 'bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200'
            }`}
          >
            {isFullscreen ? (
              <Minimize className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
            )}
            <span>Фуллскрин</span>
          </button>

          {/* Кнопка: Инструкция как установить без полосок и отступов */}
          <button
            onClick={() => setShowGuide(true)}
            title="Инструкция: как установить на экран без полосок и отступов"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-medium transition cursor-pointer active:scale-95 ${
              isDark
                ? 'bg-neutral-900 text-neutral-200 border-neutral-800 hover:bg-neutral-800'
                : 'bg-neutral-100 text-neutral-800 border-neutral-300 hover:bg-neutral-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <span>Без полосок и отступов</span>
          </button>

          {/* Звук */}
          <button
            onClick={() => {
              if (!soundEnabled) playClick();
              setSoundEnabled(!soundEnabled);
            }}
            title={soundEnabled ? 'Звук включен' : 'Без звука'}
            aria-label="Переключить звук"
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isDark
                ? soundEnabled
                  ? 'bg-neutral-900 text-neutral-200 border-neutral-800 hover:bg-neutral-800'
                  : 'bg-neutral-950 text-neutral-600 border-neutral-900'
                : soundEnabled
                ? 'bg-neutral-100 text-neutral-900 border-neutral-300 hover:bg-neutral-200'
                : 'bg-neutral-100 text-neutral-400 border-neutral-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Тема */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            title="Сменить тему оформления"
            aria-label="Сменить тему"
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isDark
                ? 'bg-neutral-900 text-neutral-200 border-neutral-800 hover:bg-neutral-800'
                : 'bg-neutral-100 text-neutral-900 border-neutral-300 hover:bg-neutral-200'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Сброс */}
          <button
            onClick={handleReset}
            title="Сбросить счетчики"
            aria-label="Сброс счетчиков"
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isDark
                ? 'bg-neutral-900 text-neutral-200 border-neutral-800 hover:bg-neutral-800'
                : 'bg-neutral-100 text-neutral-900 border-neutral-300 hover:bg-neutral-200'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Buttons Grid */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
          {buttons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => handlePress(btn.id)}
              className={`h-28 sm:h-36 rounded-2xl border transition-all duration-150 flex flex-col items-center justify-center p-4 active:scale-95 cursor-pointer touch-manipulation select-none ${
                btn.active
                  ? isDark
                    ? 'bg-white text-black border-white shadow-lg'
                    : 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                  : isDark
                  ? 'bg-neutral-950 text-neutral-200 border-neutral-800 hover:border-neutral-700'
                  : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-300 shadow-sm'
              }`}
            >
              <span className="text-sm sm:text-base font-medium">{btn.label}</span>
              <span
                className={`text-[11px] sm:text-xs mt-2 font-mono ${
                  btn.active
                    ? isDark
                      ? 'text-neutral-700'
                      : 'text-neutral-300'
                    : isDark
                    ? 'text-neutral-500'
                    : 'text-neutral-400'
                }`}
              >
                нажатий: {btn.count}
              </span>
            </button>
          ))}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer
        className={`px-4 py-3 text-center text-xs border-t pb-safe transition-colors ${
          isDark ? 'border-neutral-900 text-neutral-600' : 'border-neutral-200 text-neutral-400'
        }`}
      >
        Чистый фронтенд • Полноэкранный Web Clip для iPad iOS 9
      </footer>

      {/* Modal: Инструкция как установить на рабочий стол без полосок и отступов */}
      <IOSInstallGuide isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
}
