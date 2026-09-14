import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MoodType } from '../../types';
import {
  HeartPulse,
  Smile,
  Meh,
  Moon,
  AlertTriangle,
  Frown,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MoodScreen: React.FC = () => {
  const { moodLogs, addMoodCheckIn, latestMood, setCurrentScreen } = useApp();

  const [selectedMood, setSelectedMood] = useState<MoodType>('normal');
  const [stressScore, setStressScore] = useState(4);
  const [energyLevel, setEnergyLevel] = useState(3);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Upcoming Deadlines']);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const moodOptions: { type: MoodType; label: string; emoji: string; desc: string; color: string; bg: string }[] = [
    { type: 'happy', label: 'Happy', emoji: '😄', desc: 'Energized, confident & motivated', color: 'text-emerald-700 border-emerald-300', bg: 'bg-emerald-50' },
    { type: 'normal', label: 'Normal', emoji: '🙂', desc: 'Steady focus & standard pace', color: 'text-sky-700 border-sky-300', bg: 'bg-sky-50' },
    { type: 'tired', label: 'Tired', emoji: '🥱', desc: 'Sleep deficit or cognitive fatigue', color: 'text-amber-700 border-amber-300', bg: 'bg-amber-50' },
    { type: 'stressed', label: 'Stressed', emoji: '😰', desc: 'Pressure from multiple deadlines', color: 'text-orange-700 border-orange-300', bg: 'bg-orange-50' },
    { type: 'anxious', label: 'Anxious', emoji: '😟', desc: 'High exam worry or apprehension', color: 'text-rose-700 border-rose-300', bg: 'bg-rose-50' },
  ];

  const availableTags = [
    'Upcoming Deadlines',
    'Exams Approaching',
    'Low Sleep (<6h)',
    'Good Rest (8h+)',
    'Heavy Lab Work',
    'Understood Difficult Topic',
    'Distracted by Social Media',
    'Clear Study Environment'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRecord = (e: React.FormEvent) => {
    e.preventDefault();
    addMoodCheckIn(selectedMood, stressScore, energyLevel, selectedTags);
    confetti({ particleCount: 40, spread: 60 });
    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 5000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-2">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Design Thinking: Stress-Aware Learning</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Mood & Stress Check-In</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Record your daily mindset so StudyMate AI can adapt your study block intensity and suggest wellness micro-habits.
          </p>
        </div>
      </div>

      {/* Mandatory Educational / Non-Medical Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 shadow-xs">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Educational & Productivity Tool Notice: </span>
          StudyMate AI provides study pacing recommendations and general academic productivity suggestions. It does not provide medical diagnoses, psychological therapy, or clinical advice. For severe stress or anxiety, college students are encouraged to consult their campus student health center.
        </div>
      </div>

      {/* Grid: Check-in Form (Left) & AI Wellness & Pacing Insights (Right) */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form: Record Today's State */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-5">
          <form onSubmit={handleRecord} className="space-y-5">
            {/* 1. Mood Picker */}
            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-2">
                1. How are you feeling right now?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {moodOptions.map(opt => {
                  const isSelected = selectedMood === opt.type;
                  return (
                    <button
                      key={opt.type}
                      type="button"
                      onClick={() => setSelectedMood(opt.type)}
                      className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                        isSelected
                          ? `${opt.bg} ${opt.color} ring-2 ring-indigo-500/30 shadow-xs font-bold`
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <span className="text-xs font-bold">{opt.label}</span>
                      <span className="text-[9px] text-slate-500 line-clamp-1">{opt.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Stress Level Slider */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  2. Academic Stress Level: <span className="text-indigo-600 font-black">{stressScore} / 10</span>
                </label>
                <span className="text-[11px] font-semibold text-slate-500">
                  {stressScore <= 3 ? 'Low (Calm)' : stressScore <= 6 ? 'Moderate' : 'High (Overwhelmed)'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={stressScore}
                onChange={e => setStressScore(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 - Zen</span>
                <span>5 - Manageable Workload</span>
                <span>10 - Peak Anxiety</span>
              </div>
            </div>

            {/* 3. Energy Level */}
            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-2">
                3. Physical Energy Level: <span className="text-indigo-600">{energyLevel} / 5</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setEnergyLevel(lvl)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-bold transition ${
                      energyLevel === lvl
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Level {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Contributing Academic Factors */}
            <div>
              <label className="block text-xs font-extrabold text-slate-800 mb-2">
                4. What's on your mind today? (Optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                        isSelected
                          ? 'bg-indigo-100 text-indigo-800 border border-indigo-300 font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl gradient-brand text-white font-bold text-xs shadow-md shadow-indigo-500/25 hover:brightness-110 flex items-center justify-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Log Mood & Calculate Adaptive Schedule</span>
            </button>
          </form>
        </div>

        {/* Right 1 Col: Latest AI Wellness & Adaptation Output */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-indigo-200 shadow-soft">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h3 className="font-extrabold text-slate-900 text-sm">
                AI Schedule Adaptation
              </h3>
            </div>

            {latestMood ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white rounded-2xl border border-indigo-100 shadow-xs">
                  <span className="block font-bold text-slate-800 mb-1">🌿 General Wellness Advice:</span>
                  <p className="text-slate-600 leading-relaxed">
                    {latestMood.aiWellnessAdvice}
                  </p>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-indigo-100 shadow-xs">
                  <span className="block font-bold text-indigo-900 mb-1">⏱️ Study Pacing Adaptation:</span>
                  <p className="text-slate-600 leading-relaxed">
                    {latestMood.aiScheduleAdaptation}
                  </p>
                </div>

                <button
                  onClick={() => setCurrentScreen('planner')}
                  className="w-full py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition flex items-center justify-center gap-1"
                >
                  <span>Apply to Study Planner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Log your first mood check-in to unlock personalized study recommendations!
              </p>
            )}
          </div>

          {/* Recent History */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft space-y-3">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Recent Check-In History</span>
            </h4>
            <div className="space-y-2">
              {moodLogs.slice(0, 3).map(log => (
                <div key={log.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800 capitalize flex items-center gap-1">
                      <span>{log.mood}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {log.date} • {log.timestamp}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Stress Score: <span className="font-bold text-slate-700">{log.stressScore}/10</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
