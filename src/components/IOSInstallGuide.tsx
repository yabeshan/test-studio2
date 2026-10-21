import React from 'react';
import { Share, PlusSquare, X, CheckCircle, Maximize2, Tablet } from 'lucide-react';

interface IOSInstallGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IOSInstallGuide: React.FC<IOSInstallGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-7 text-neutral-100 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
              <Tablet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white">
                Установка на рабочий стол без полосок и отступов
              </h2>
              <p className="text-xs text-neutral-400">
                Запуск в режиме Web Clip для iPad (iOS 9+)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Why: Without Bars & Strips */}
        <div className="p-3.5 mb-5 rounded-xl bg-sky-950/40 border border-sky-800/50 text-xs text-sky-200 leading-relaxed flex items-start gap-2.5">
          <Maximize2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">Как убрать полосы и рамки Safari:</strong>
            В обычном Safari всегда видны адресная строка и панель вкладок. При установке на экран «Домой» приложение запускается как нативное — <strong>на весь экран от края до края, полностью без полосок, рамок и адресной строки Safari</strong>.
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3.5 text-sm">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800/80">
            <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
              1
            </span>
            <div>
              <div className="font-medium text-white flex items-center gap-1.5 flex-wrap">
                Нажмите «Поделиться»
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-neutral-800 text-sky-400 border border-neutral-700 text-xs">
                  <Share className="w-3 h-3 mr-1" /> значок со стрелкой
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                На верхней панели инструментов Safari на iPad (справа от адреса).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800/80">
            <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
              2
            </span>
            <div>
              <div className="font-medium text-white flex items-center gap-1.5 flex-wrap">
                Выберите «На экран «Домой»»
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-neutral-800 text-emerald-400 border border-neutral-700 text-xs">
                  <PlusSquare className="w-3 h-3 mr-1" /> иконка с плюсом
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Прокрутите нижний ряд меню и коснитесь «На экран «Домой»».
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800/80">
            <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
              3
            </span>
            <div>
              <div className="font-medium text-white">
                Нажмите «Добавить» и запустите с рабочего стола
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                В правом верхнем углу нажмите «Добавить». Откройте появившуюся иконку — приложение откроется во весь экран без полос браузера.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits badge */}
        <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>Работает оффлайн и без браузерных полос и рамок</span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium transition cursor-pointer"
        >
          Понятно, закрыть
        </button>
      </div>
    </div>
  );
};
