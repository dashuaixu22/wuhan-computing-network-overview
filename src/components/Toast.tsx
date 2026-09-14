import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'info' | 'success';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
  if (!message) return null;

  return (
    <div
      id="app-toast"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3.5 py-2.5 bg-[#25324B]/95 text-white text-[13px] rounded-[6px] shadow-lg border border-[#3978F6]/30 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      {type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-[#34D399] flex-shrink-0" />
      ) : (
        <Info className="w-4 h-4 text-[#60A5FA] flex-shrink-0" />
      )}
      <span className="font-normal leading-tight">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-[#9AA5B5] hover:text-white text-xs px-1"
      >
        ✕
      </button>
    </div>
  );
};
