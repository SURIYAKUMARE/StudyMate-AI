import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Brain,
  Clock,
  HeartPulse,
  Flame
} from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setCurrentScreen, setIsDesignThinkingModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top bar */}
      <div className="flex items-center justify-between z-10 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            StudyMate <span className="text-indigo-400">AI</span>
          </span>
        </div>

        <button
          onClick={() => setIsDesignThinkingModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-indigo-200 border border-white/10 transition backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Design Thinking Model</span>
        </button>
      </div>

      {/* Hero Content */}
      <div className="max-w-xl mx-auto text-center my-auto z-10 py-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-6">
          <Brain className="w-3.5 h-3.5" />
          <span>AI-Powered Academic Balance & Focus</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4">
          Master College Life Without The{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Burnout.
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
          Struggling with procrastination, overlapping deadlines, and exam anxiety?
          StudyMate AI creates dynamic, stress-aware schedules that adjust when life happens.
        </p>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8 text-xs">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span className="font-medium text-slate-200">Adaptive Planner</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="font-medium text-slate-200">Pomodoro Focus</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            <span className="font-medium text-slate-200">Stress Check-In</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center gap-1">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="font-medium text-slate-200">AI Study Tutor</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setCurrentScreen('home')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl gradient-brand text-white font-bold text-sm shadow-xl shadow-indigo-600/40 hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2"
          >
            <span>Launch Demo as Alex Chen</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentScreen('onboarding')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition flex items-center justify-center gap-2"
          >
            <span>Design Thinking Onboarding</span>
          </button>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-xs text-slate-500 z-10">
        <div className="flex items-center justify-center gap-1.5 mb-1 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Educational & Productivity Tool • Built for Student Success</span>
        </div>
        <span>StudyMate AI © 2026</span>
      </div>
    </div>
  );
};
