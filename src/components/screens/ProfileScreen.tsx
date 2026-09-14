import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Settings,
  Bell,
  Sparkles,
  Smartphone,
  Monitor,
  RotateCcw,
  Download,
  ShieldCheck,
  Award,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProfileScreen: React.FC = () => {
  const {
    profile,
    updateProfile,
    deviceMode,
    setDeviceMode,
    resetDemoData,
    studyPlan,
    setIsDesignThinkingModalOpen
  } = useApp();

  const [name, setName] = useState(profile.name);
  const [major, setMajor] = useState(profile.major);
  const [university, setUniversity] = useState(profile.university);
  const [targetGpa, setTargetGpa] = useState(profile.targetGpa);
  const [dailyMinutes, setDailyMinutes] = useState(profile.dailyGoalMinutes);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Notification toggles
  const [notifDeadlines, setNotifDeadlines] = useState(true);
  const [notifBreaks, setNotifBreaks] = useState(true);
  const [notifReschedule, setNotifReschedule] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      major,
      university,
      targetGpa,
      dailyGoalMinutes: dailyMinutes
    });
    confetti({ particleCount: 40, spread: 60 });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const exportSchedule = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(studyPlan, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `studymate_schedule_${profile.name.replace(' ', '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Student Hub</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Profile & Settings</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your academic targets, study preferences, and demonstration modes.
          </p>
        </div>

        <button
          onClick={() => setIsDesignThinkingModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs flex items-center gap-2 transition"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>View Design Thinking Architecture</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Academic preferences updated successfully!</span>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Profile Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-indigo-500/20 bg-indigo-50 flex items-center justify-center">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-lg font-black text-indigo-600">AC</span>
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">{profile.name}</h2>
              <p className="text-xs text-slate-500">{profile.email}</p>
              <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                {profile.year}
              </span>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target GPA / Honours Goal</label>
                <input
                  type="text"
                  value={targetGpa}
                  onChange={e => setTargetGpa(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">University / College</label>
              <input
                type="text"
                value={university}
                onChange={e => setUniversity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Major & Specialization</label>
              <input
                type="text"
                value={major}
                onChange={e => setMajor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            {/* Daily Goal Minutes */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800">
                  Target Daily Focus Study: <span className="text-indigo-600 font-black">{Math.floor(dailyMinutes / 60)}h {dailyMinutes % 60}m</span>
                </label>
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
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:brightness-110 transition"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Col: Notification Settings & Demo Tools */}
        <div className="space-y-6">
          {/* Presentation Device Mode */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-indigo-600" />
              <span>Project Presentation Mode</span>
            </h3>
            <p className="text-xs text-slate-500">
              Toggle between a realistic mobile phone frame view and a widescreen dashboard.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setDeviceMode('web')}
                className={`py-2.5 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                  deviceMode === 'web'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Web Dashboard</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                className={`py-2.5 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                  deviceMode === 'mobile'
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Shell</span>
              </button>
            </div>
          </div>

          {/* Smart Notification Preferences */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-3 text-xs">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-600" />
              <span>Notification Reminders</span>
            </h3>

            <div className="space-y-2.5 pt-1">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-700">Exam & Assignment Deadlines</span>
                <input
                  type="checkbox"
                  checked={notifDeadlines}
                  onChange={e => setNotifDeadlines(e.target.checked)}
                  className="rounded accent-indigo-600 w-4 h-4"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-700">Mindful Pomodoro Breaks</span>
                <input
                  type="checkbox"
                  checked={notifBreaks}
                  onChange={e => setNotifBreaks(e.target.checked)}
                  className="rounded accent-indigo-600 w-4 h-4"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-700">AI Schedule Reallocations</span>
                <input
                  type="checkbox"
                  checked={notifReschedule}
                  onChange={e => setNotifReschedule(e.target.checked)}
                  className="rounded accent-indigo-600 w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Export & Reset Demo */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-3">
            <h3 className="font-extrabold text-slate-900 text-sm">Demo & Data Management</h3>

            <button
              onClick={exportSchedule}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Study Schedule (JSON)</span>
            </button>

            <button
              onClick={resetDemoData}
              className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200/80 flex items-center justify-center gap-2 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Clean Student Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
