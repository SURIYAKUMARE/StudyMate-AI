import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  Flame,
  CheckCircle2,
  Clock,
  Timer,
  BookOpen,
  Sparkles,
  TrendingUp,
  Award,
  Calendar
} from 'lucide-react';

export const ProgressScreen: React.FC = () => {
  const { profile, tasks, subjects, focusSessions, todayStudiedMinutes } = useApp();

  const completedTasksCount = tasks.filter(t => t.isCompleted).length;
  const pendingTasksCount = tasks.filter(t => !t.isCompleted).length;
  const taskCompletionRate = Math.round((completedTasksCount / (tasks.length || 1)) * 100);

  // Weekly study hours data (Mon - Sun)
  const weeklyStudyHours = [
    { day: 'Mon', hours: 3.5, target: 3.0 },
    { day: 'Tue', hours: 4.0, target: 3.0 },
    { day: 'Wed', hours: 2.5, target: 3.0 },
    { day: 'Thu', hours: 4.5, target: 3.0 },
    { day: 'Fri', hours: 3.0, target: 3.0 },
    { day: 'Sat', hours: 5.0, target: 3.5 },
    { day: 'Sun', hours: 2.0, target: 3.5 }
  ];

  const totalWeeklyHours = weeklyStudyHours.reduce((acc, curr) => acc + curr.hours, 0);

  const maxBarValue = 6.0;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Design Thinking: Progress Feedback Loop</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Academic Progress Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time analytics monitoring your study hours, task velocity, subject mastery, and focus consistency.
          </p>
        </div>

        {/* Productivity Score Pill */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-3 rounded-2xl shadow-md shadow-indigo-500/20">
          <Award className="w-6 h-6 text-amber-300" />
          <div>
            <div className="text-lg font-black">{profile.productivityScore}%</div>
            <div className="text-[10px] text-indigo-100 font-semibold uppercase tracking-wider">Productivity Score</div>
          </div>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Study Hours */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Weekly Study</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalWeeklyHours} hrs</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+2.5 hrs vs last week</span>
          </p>
        </div>

        {/* 2. Tasks Completion */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Task Velocity</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {completedTasksCount} <span className="text-sm font-normal text-slate-400">/ {tasks.length}</span>
          </div>
          <p className="text-[11px] text-slate-500 font-semibold mt-1">
            {pendingTasksCount} pending assignments
          </p>
        </div>

        {/* 3. Focus Sessions */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Focus Sessions</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Timer className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{focusSessions.length} logged</div>
          <p className="text-[11px] text-purple-600 font-semibold mt-1">
            {todayStudiedMinutes} mins focused today
          </p>
        </div>

        {/* 4. Study Streak */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Active Streak</span>
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
              <Flame className="w-4 h-4 fill-orange-500" />
            </div>
          </div>
          <div className="text-2xl font-black text-orange-600 flex items-center gap-1">
            <span>{profile.currentStreak} Days</span>
            <span className="text-base">🔥</span>
          </div>
          <p className="text-[11px] text-slate-500 font-semibold mt-1">
            Personal best: {profile.longestStreak} days
          </p>
        </div>
      </div>

      {/* Charts Row: Weekly Study Hours (Left 2 cols) + Subject-Wise Progress (Right 1 col) */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Study Hours Visual Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Weekly Study Hours (Mon - Sun)</h3>
              <p className="text-xs text-slate-400">Visual comparison of actual daily hours against targets</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-indigo-600" />
                <span className="text-slate-600">Actual Hours</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-slate-300 rounded-full" />
                <span className="text-slate-400">Target (3h)</span>
              </div>
            </div>
          </div>

          {/* Bar Visualization */}
          <div className="h-56 flex items-end justify-between gap-3 pt-8 pb-2 px-2 border-b border-slate-100">
            {weeklyStudyHours.map(item => {
              const heightPercent = Math.min(100, Math.round((item.hours / maxBarValue) * 100));
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[10px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.hours}h
                  </span>
                  <div className="w-full max-w-[36px] bg-slate-100 rounded-2xl h-full flex items-end p-1 relative">
                    {/* Target dashed line indicator */}
                    <div
                      className="absolute left-0 right-0 border-t-2 border-dashed border-slate-300 z-10 pointer-events-none"
                      style={{ bottom: `${(item.target / maxBarValue) * 100}%` }}
                    />
                    {/* Actual fill */}
                    <div
                      className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-xl transition-all duration-500 group-hover:brightness-110"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-600">{item.day}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Average: {(totalWeeklyHours / 7).toFixed(1)} hrs/day</span>
            <span className="text-indigo-600 font-bold">Goal met 6 out of 7 days 🎯</span>
          </div>
        </div>

        {/* Subject-Wise Mastery Progress */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm">Subject Progress</h3>
            <span className="text-xs text-indigo-600 font-bold">Weekly Goals</span>
          </div>

          <div className="space-y-4">
            {subjects.map(subject => {
              const percent = Math.min(
                100,
                Math.round((subject.completedHoursWeekly / subject.targetHoursWeekly) * 100)
              );
              return (
                <div key={subject.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{subject.name}</span>
                    <span className="text-slate-500">
                      {subject.completedHoursWeekly}h / {subject.targetHoursWeekly}h
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: subject.color
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{subject.code}</span>
                    <span className="font-bold text-slate-600">{percent}% of target</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 7-Day Consistency Heatmap */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
        <h3 className="font-extrabold text-slate-900 text-sm mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-600" />
          <span>7-Day Study Habit Consistency</span>
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {[
            { day: 'Mon', active: true, mins: 210 },
            { day: 'Tue', active: true, mins: 240 },
            { day: 'Wed', active: true, mins: 150 },
            { day: 'Thu', active: true, mins: 270 },
            { day: 'Fri', active: true, mins: 180 },
            { day: 'Sat', active: true, mins: 300 },
            { day: 'Sun (Today)', active: true, mins: todayStudiedMinutes }
          ].map(h => (
            <div
              key={h.day}
              className={`p-3 rounded-2xl border text-center transition ${
                h.active
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <div className="text-[10px] font-bold uppercase text-slate-500 mb-1">{h.day}</div>
              <div className="text-xs font-black text-emerald-700">{h.mins}m</div>
              <div className="text-[9px] text-emerald-600 mt-0.5">Completed</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
