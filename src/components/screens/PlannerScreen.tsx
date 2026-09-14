import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { generateAIStudyPlan } from '../../utils/aiEngine';
import {
  Calendar,
  Sparkles,
  RefreshCw,
  Plus,
  Clock,
  CheckCircle2,
  Circle,
  Play,
  Filter,
  Check,
  CalendarDays,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PlannerScreen: React.FC = () => {
  const {
    subjects,
    studyPlan,
    setStudyPlan,
    togglePlanItem,
    handleRescheduleMissed,
    profile,
    setCurrentScreen
  } = useApp();

  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || '');
  const [topicName, setTopicName] = useState('');
  const [difficulty, setDifficulty] = useState(3);
  const [dailyHours, setDailyHours] = useState(3);
  const [daysCount, setDaysCount] = useState(7);
  const [rescheduleMessage, setRescheduleMessage] = useState<string | null>(null);
  const [selectedDayFilter, setSelectedDayFilter] = useState<'all' | string>('all');

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    const newItems = generateAIStudyPlan(
      subjects,
      topicName ? [{ subjectId: selectedSubjectId, topicName, difficulty }] : [],
      dailyHours,
      daysCount
    );

    setStudyPlan(newItems);
    confetti({ particleCount: 60, spread: 70 });
    setTopicName('');
  };

  const onRescheduleClick = () => {
    const msg = handleRescheduleMissed();
    setRescheduleMessage(msg);
    setTimeout(() => setRescheduleMessage(null), 6000);
  };

  // Group study plan items by date
  const uniqueDates = Array.from(new Set(studyPlan.map(p => p.date))).sort();

  const filteredPlan = selectedDayFilter === 'all'
    ? studyPlan
    : studyPlan.filter(p => p.date === selectedDayFilter);

  const missedCount = studyPlan.filter(
    p => p.date < new Date().toISOString().split('T')[0] && !p.isCompleted
  ).length;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Design Thinking: AI Scheduler</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">AI Study Planner</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Generates realistic study blocks tailored to your subjects, cognitive capacity, and upcoming deadlines.
          </p>
        </div>

        {/* Reschedule Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRescheduleClick}
            className="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 font-bold text-xs flex items-center gap-2 transition shadow-xs"
            title="Automatically reallocate missed study sessions"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Reschedule Missed ({missedCount})</span>
          </button>
        </div>
      </div>

      {/* Reschedule Alert Message */}
      {rescheduleMessage && (
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>{rescheduleMessage}</span>
        </div>
      )}

      {/* Grid: Plan Generator Form (Left) & Schedule Timeline (Right) */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form: AI Schedule Parameters */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft h-fit space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Generate Custom Plan</h3>
          </div>

          <form onSubmit={handleGeneratePlan} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Subject</label>
              <select
                value={selectedSubjectId}
                onChange={e => setSelectedSubjectId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Priority Topic / Module (Optional)</label>
              <input
                type="text"
                value={topicName}
                onChange={e => setTopicName(e.target.value)}
                placeholder="e.g. Taylor Polynomials & Series"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Topic Difficulty: <span className="text-indigo-600 font-extrabold">{difficulty}/5</span>
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={difficulty}
                onChange={e => setDifficulty(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 - Review</span>
                <span>3 - Standard</span>
                <span>5 - Complex</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Daily Study Hours: <span className="text-indigo-600 font-extrabold">{dailyHours} hrs</span>
              </label>
              <input
                type="range"
                min="1"
                max="6"
                value={dailyHours}
                onChange={e => setDailyHours(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1h (Light)</span>
                <span>3h (Recommended)</span>
                <span>6h (Intense)</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Horizon</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setDaysCount(3)}
                  className={`py-2 rounded-xl border transition ${
                    daysCount === 3
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  3 Days Sprint
                </button>
                <button
                  type="button"
                  onClick={() => setDaysCount(7)}
                  className={`py-2 rounded-xl border transition ${
                    daysCount === 7
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  7 Days Full Week
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:brightness-110 flex items-center justify-center gap-2 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Realistic Plan</span>
            </button>
          </form>

          {/* AI Guardrail Info */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
            <div className="font-bold text-slate-700 flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-500" />
              <span>Design Thinking Principle:</span>
            </div>
            <p>
              AI schedules incorporate mandatory 15m cognitive buffers and interleave practice types to maximize memory consolidation.
            </p>
          </div>
        </div>

        {/* Schedule Timeline (Right 2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Day Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedDayFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedDayFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              All Days ({studyPlan.length})
            </button>
            {uniqueDates.map(date => {
              const isToday = date === new Date().toISOString().split('T')[0];
              return (
                <button
                  key={date}
                  onClick={() => setSelectedDayFilter(date)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    selectedDayFilter === date
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {isToday ? 'Today' : date.slice(5)}
                </button>
              );
            })}
          </div>

          {/* Plan Items List */}
          <div className="space-y-3">
            {filteredPlan.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
                <p className="text-xs text-slate-500">No scheduled study sessions match this day.</p>
              </div>
            ) : (
              filteredPlan.map(item => (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                    item.isCompleted
                      ? 'bg-slate-50/80 border-slate-200 opacity-70'
                      : 'bg-white border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-soft'
                  }`}
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <button
                      onClick={() => togglePlanItem(item.id)}
                      className="text-slate-300 hover:text-indigo-600 transition shrink-0"
                    >
                      {item.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 hover:text-indigo-500" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                          {item.date} • {item.timeSlot}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          {item.type.replace('_', ' ')}
                        </span>
                        {item.priority === 'high' && (
                          <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-rose-50 text-rose-600">
                            High Priority
                          </span>
                        )}
                      </div>
                      <h4
                        className={`text-xs sm:text-sm font-bold truncate ${
                          item.isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                        }`}
                      >
                        {item.topicTitle}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-slate-500 font-medium">
                      {item.durationMinutes}m
                    </span>
                    {!item.isCompleted && (
                      <button
                        onClick={() => setCurrentScreen('timer')}
                        className="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                        title="Start Pomodoro Focus"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
