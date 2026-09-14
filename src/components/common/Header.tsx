import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Flame,
  Bell,
  Smartphone,
  Monitor,
  Lightbulb,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    deviceMode,
    setDeviceMode,
    profile,
    unreadNotifsCount,
    setIsDesignThinkingModalOpen,
    setIsNotificationDrawerOpen
  } = useApp();

  // Hide header on splash & auth screens for full-screen focus
  if (currentScreen === 'splash' || currentScreen === 'login') {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                StudyMate
              </span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 uppercase tracking-wider">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-500 hidden sm:block">Design Thinking Study Assistant</p>
          </div>
        </div>

        {/* Center: Design Thinking Action Pill */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDesignThinkingModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100 transition shadow-sm"
            title="Explore the 5 stages of Design Thinking behind StudyMate AI"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span className="hidden sm:inline">Design Thinking</span>
            <span className="sm:hidden">DT Model</span>
          </button>
        </div>

        {/* Right: Actions, Streak, Device Mode & Notifications */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Device Mockup Toggle */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs">
            <button
              onClick={() => setDeviceMode('web')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition ${
                deviceMode === 'web'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Full Responsive Web View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Web</span>
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition ${
                deviceMode === 'mobile'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Mobile App Frame View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>

          {/* Streak Badge */}
          <div
            onClick={() => setCurrentScreen('progress')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200/70 text-orange-700 cursor-pointer hover:bg-orange-100 transition"
            title={`${profile.currentStreak} Day Study Streak`}
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span className="text-xs font-bold">{profile.currentStreak}d</span>
          </div>

          {/* Notifications Bell */}
          <button
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
                {unreadNotifsCount}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <div
            onClick={() => setCurrentScreen('profile')}
            className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-slate-100 transition"
            title="Student Profile"
          >
            <div className="w-8 h-8 rounded-full ring-2 ring-indigo-500/30 overflow-hidden bg-indigo-50 flex items-center justify-center">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback avatar
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-xs font-bold text-indigo-600">AC</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
