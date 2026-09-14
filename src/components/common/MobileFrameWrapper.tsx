import React from 'react';
import { useApp } from '../../context/AppContext';
import { Smartphone, RotateCcw } from 'lucide-react';

export const MobileFrameWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { deviceMode, setDeviceMode } = useApp();

  if (deviceMode !== 'mobile') {
    return <>{children}</>;
  }

  return (
    <div className="hidden md:flex min-h-screen bg-slate-900/90 py-8 px-4 items-center justify-center">
      <div className="relative w-[410px] h-[850px] bg-slate-950 rounded-[50px] p-3.5 shadow-phone ring-1 ring-white/10 flex flex-col">
        {/* Phone Speaker & Dynamic Island */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-center gap-2 px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
        </div>

        {/* Outer Phone Frame */}
        <div className="relative flex-1 bg-slate-50 rounded-[38px] overflow-hidden flex flex-col border border-slate-800">
          <div className="flex-1 overflow-y-auto pb-16">
            {children}
          </div>
        </div>

        {/* Home Indicator Bar */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full" />
      </div>

      {/* Floating helper badge to switch back to Web View */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setDeviceMode('web')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-slate-800 font-bold text-xs shadow-xl hover:bg-slate-100 transition ring-1 ring-slate-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Exit Phone Frame (Full Web View)</span>
        </button>
      </div>
    </div>
  );
};
