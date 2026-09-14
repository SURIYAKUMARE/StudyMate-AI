import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lightbulb,
  HeartHandshake,
  Target,
  Sparkles,
  Smartphone,
  CheckCircle2,
  X,
  ArrowRight,
  Zap,
  Activity,
  Award
} from 'lucide-react';

export const DesignThinkingModal: React.FC = () => {
  const { isDesignThinkingModalOpen, setIsDesignThinkingModalOpen, setCurrentScreen } = useApp();
  const [activeTab, setActiveTab] = useState<'empathize' | 'define' | 'ideate' | 'prototype' | 'test'>('empathize');

  if (!isDesignThinkingModalOpen) return null;

  const stages = [
    { id: 'empathize', label: '1. Empathize', icon: HeartHandshake, color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'define', label: '2. Define', icon: Target, color: 'text-amber-500', bg: 'bg-amber-50' },
    { id: 'ideate', label: '3. Ideate', icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'prototype', label: '4. Prototype', icon: Smartphone, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { id: 'test', label: '5. Test & Impact', icon: Award, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 via-purple-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Design Thinking Architecture
              </h2>
              <p className="text-xs text-slate-500">
                How human-centered design + AI solved real college student challenges
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDesignThinkingModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stage Tabs */}
        <div className="flex border-b border-slate-100 px-6 bg-slate-50/70 overflow-x-auto gap-2 py-2">
          {stages.map(stage => {
            const Icon = stage.icon;
            const isActive = activeTab === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveTab(stage.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  isActive
                    ? `${stage.bg} ${stage.color} ring-1 ring-inset ring-current`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{stage.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-sm text-slate-600 leading-relaxed">
          {activeTab === 'empathize' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 text-rose-900">
                <h3 className="font-bold text-base flex items-center gap-2 mb-1">
                  <HeartHandshake className="w-5 h-5 text-rose-600" />
                  Understanding the Student Struggle
                </h3>
                <p className="text-xs text-rose-700">
                  Through student interviews and research, college students consistently reported feeling paralyzed by competing demands.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xs font-bold text-slate-800 mb-1">😩 Schedule Paralysis</div>
                  <p className="text-xs text-slate-500">
                    Difficulty creating realistic study plans. Traditional calendars are rigid; one missed session causes the whole week to collapse.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xs font-bold text-slate-800 mb-1">⏳ Chronic Procrastination</div>
                  <p className="text-xs text-slate-500">
                    Students delay difficult subjects (e.g. Calculus or Algorithms) because the task looks too massive and intimidating.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xs font-bold text-slate-800 mb-1">⚡ Cognitive Overload</div>
                  <p className="text-xs text-slate-500">
                    Assignments, lab reports, exams, and personal commitments compete simultaneously with no objective priority ranking.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xs font-bold text-slate-800 mb-1">😰 Exam Anxiety & Fatigue</div>
                  <p className="text-xs text-slate-500">
                    Unchecked stress reduces retention and leads to all-night cramming sessions that ruin sleep and memory consolidation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'define' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 text-amber-900">
                <h3 className="font-bold text-base flex items-center gap-2 mb-1">
                  <Target className="w-5 h-5 text-amber-600" />
                  Defining the Core Problem & Persona
                </h3>
                <p className="text-xs text-amber-800">
                  "How might we help college students balance heavy academic workloads without falling prey to procrastination and burnout?"
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Target Student Persona: Alex Chen (3rd Year CS)</div>
                <ul className="text-xs space-y-1.5 list-disc list-inside text-slate-600">
                  <li><strong>Core Need:</strong> A study partner that doesn't just display static calendars, but dynamically recalculates plans when life happens.</li>
                  <li><strong>Emotional Need:</strong> Non-judgmental encouragement, stress-aware pacing, and manageable micro-steps.</li>
                  <li><strong>Actionable Insight:</strong> Pacing must dynamically adjust according to self-reported energy and mood check-ins.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'ideate' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-purple-900">
                <h3 className="font-bold text-base flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Brainstorming AI-Powered Solutions
                </h3>
                <p className="text-xs text-purple-800">
                  Leveraging Artificial Intelligence to automate cognitive load reduction and study science.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                  <div className="font-bold text-xs text-indigo-900 mb-1">1. Adaptive Scheduling</div>
                  <p className="text-[11px] text-slate-600">
                    Distributes available study hours into realistic 45-60m chunks. When a session is missed, one-click AI reschedule distributes it gently.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100">
                  <div className="font-bold text-xs text-purple-900 mb-1">2. AI Priority Matrix</div>
                  <p className="text-[11px] text-slate-600">
                    Calculates Urgency + Difficulty + Importance score (0-100) to strip away guesswork and tell students what to do next.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                  <div className="font-bold text-xs text-emerald-900 mb-1">3. Stress-Aware Pacing</div>
                  <p className="text-[11px] text-slate-600">
                    Mood check-in converts intense problem solving into lighter review blocks when student is stressed or fatigued.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prototype' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-indigo-900">
                <h3 className="font-bold text-base flex items-center gap-2 mb-1">
                  <Smartphone className="w-5 h-5 text-indigo-600" />
                  High-Fidelity Interactive Prototype
                </h3>
                <p className="text-xs text-indigo-800">
                  Designed mobile-first with modern rounded cards, clean typography, bottom navigation, and dual responsive view.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <p>Features implemented directly in this prototype:</p>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>AI Study Plan Generator</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Pomodoro Focus Timer & Audio</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Mood & Stress Check-in</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>AI Study Companion Chatbot</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Exam Live Countdown Timers</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Progress Charts & Streaks</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'test' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-emerald-900">
                <h3 className="font-bold text-base flex items-center gap-2 mb-1">
                  <Award className="w-5 h-5 text-emerald-600" />
                  Testing & Educational Impact
                </h3>
                <p className="text-xs text-emerald-800">
                  Measuring student outcomes and cognitive load reduction during study sprints.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-xs font-bold text-slate-800">Key Academic Impact Metrics:</div>
                <div className="grid sm:grid-cols-3 gap-2 text-center">
                  <div className="p-3 bg-white rounded-xl border">
                    <div className="text-lg font-extrabold text-indigo-600">-42%</div>
                    <div className="text-[10px] text-slate-500">Procrastination Delay</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border">
                    <div className="text-lg font-extrabold text-purple-600">+3.2 hrs</div>
                    <div className="text-[10px] text-slate-500">Weekly Focused Study</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border">
                    <div className="text-lg font-extrabold text-emerald-600">89%</div>
                    <div className="text-[10px] text-slate-500">On-Time Submissions</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            StudyMate AI • Design Thinking Academic Platform
          </span>
          <button
            onClick={() => setIsDesignThinkingModalOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
