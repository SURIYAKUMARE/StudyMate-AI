import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Brain,
  Sun,
  Sunset,
  Moon,
  Clock,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OnboardingScreen: React.FC = () => {
  const { profile, updateProfile, setCurrentScreen } = useApp();
  const [step, setStep] = useState(1);

  const [major, setMajor] = useState(profile.major);
  const [targetGpa, setTargetGpa] = useState(profile.targetGpa);
  const [challenges, setChallenges] = useState<string[]>(profile.studyChallenges);
  const [peakTime, setPeakTime] = useState<typeof profile.peakEnergyTime>(profile.peakEnergyTime);
  const [dailyMinutes, setDailyMinutes] = useState(profile.dailyGoalMinutes);

  const allChallengeOptions = [
    'Procrastination on heavy problem sets',
    'Multiple overlapping assignment deadlines',
    'Exam stress & panic before test days',
    'Creating unrealistic study schedules that break',
    'Lack of motivation & focus after 30 minutes',
    'Trouble balancing personal life and academics'
  ];

  const toggleChallenge = (item: string) => {
    if (challenges.includes(item)) {
      setChallenges(challenges.filter(c => c !== item));
    } else {
      setChallenges([...challenges, item]);
    }
  };

  const handleFinish = () => {
    updateProfile({
      major,
      targetGpa,
      studyChallenges: challenges,
      peakEnergyTime: peakTime,
      dailyGoalMinutes: dailyMinutes
    });
    confetti({ particleCount: 70, spread: 80 });
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-card border border-slate-200/80 p-6 sm:p-8">
        {/* Step progress bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
              {step}
            </span>
            <span className="text-xs font-bold text-slate-700">Step {step} of 3</span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? 'w-8 bg-indigo-600' : s < step ? 'w-5 bg-indigo-300' : 'w-5 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Academic Identity */}
        {step === 1 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
                <Brain className="w-3.5 h-3.5" />
                <span>Academic Profile</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Let’s personalize your academic toolkit
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                StudyMate AI adapts your daily workload around your curriculum demands.
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Major / Specialization</label>
                <input
                  type="text"
                  value={major}
                  onChange={e => setMajor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  placeholder="e.g. Computer Science & Mathematics"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Semester GPA / Grade Goal</label>
                <input
                  type="text"
                  value={targetGpa}
                  onChange={e => setTargetGpa(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  placeholder="e.g. 3.85 / 4.0"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:brightness-110 flex items-center gap-1.5 transition"
              >
                <span>Continue to Empathy Mapping</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Empathize with Student Pain Points */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-2">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Design Thinking: Empathize</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                What are your biggest study hurdles?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select all that apply. Our AI algorithm will specifically target these stress points.
              </p>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {allChallengeOptions.map(option => {
                const isSelected = challenges.includes(option);
                return (
                  <div
                    key={option}
                    onClick={() => toggleChallenge(option)}
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between text-xs transition ${
                      isSelected
                        ? 'bg-indigo-50/80 border-indigo-300 font-semibold text-indigo-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{option}</span>
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        isSelected ? 'text-indigo-600 fill-indigo-100' : 'text-slate-300'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl text-slate-500 font-semibold text-xs hover:bg-slate-100 transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:brightness-110 flex items-center gap-1.5 transition"
              >
                <span>Calibrate Routine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Energy & Routine Calibration */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Routine Calibration</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                When does your brain focus best?
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                We'll schedule your highest-difficulty subjects when your cognitive capacity peaks.
              </p>
            </div>

            {/* Peak Time Options */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'morning', label: 'Morning', sub: '8:00 AM - 12:00 PM', icon: Sun },
                { id: 'afternoon', label: 'Afternoon', sub: '12:00 PM - 5:00 PM', icon: Sunset },
                { id: 'evening', label: 'Evening', sub: '5:00 PM - 9:00 PM', icon: Sunset },
                { id: 'night', label: 'Night Owl', sub: '9:00 PM - 1:00 AM', icon: Moon }
              ].map(slot => {
                const Icon = slot.icon;
                const isSelected = peakTime === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setPeakTime(slot.id as typeof peakTime)}
                    className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold text-slate-900">{slot.label}</span>
                    <span className="text-[10px] text-slate-500">{slot.sub}</span>
                  </button>
                );
              })}
            </div>

            {/* Daily Goal Slider */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Target Daily Focused Study</span>
                </label>
                <span className="text-xs font-extrabold text-indigo-600">
                  {Math.floor(dailyMinutes / 60)} hrs {dailyMinutes % 60 > 0 ? `${dailyMinutes % 60}m` : ''}
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="360"
                step="30"
                value={dailyMinutes}
                onChange={e => setDailyMinutes(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1 Hour (Light)</span>
                <span>3 Hours (Recommended)</span>
                <span>6 Hours (Intense)</span>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl text-slate-500 font-semibold text-xs hover:bg-slate-100 transition"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:brightness-110 flex items-center gap-1.5 transition"
              >
                <span>Activate StudyMate AI</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
