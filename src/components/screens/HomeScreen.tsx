import React from 'react';
import { useApp } from '../../context/AppContext';
import { getSmartHomeRecommendation } from '../../utils/aiEngine';
import {
  Flame,
  Clock,
  CheckCircle2,
  Circle,
  Play,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Calendar,
  HeartPulse,
  ChevronRight,
  Compass
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    profile,
    studyPlan,
    togglePlanItem,
    tasks,
    exams,
    latestMood,
    todayStudiedMinutes,
    setCurrentScreen
  } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayPlanItems = studyPlan.filter(item => item.date === todayStr);

  const nearestExam = [...exams].sort(
    (a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime()
  )[0];

  const daysUntilExam = nearestExam
    ? Math.max(1, Math.ceil((new Date(nearestExam.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : null;

  const urgentTasks = tasks.filter(t => !t.isCompleted && (t.aiPriorityLabel === 'Critical' || t.aiPriorityLabel === 'High'));

  // Calculate goal percentage
  const goalProgressPercent = Math.min(100, Math.round((todayStudiedMinutes / (profile.dailyGoalMinutes || 180)) * 100));

  const aiRec = getSmartHomeRecommendation(exams, tasks, profile.currentStreak);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Greeting & Streak Hero Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-6 text-white shadow-card relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-2">
            <span>{profile.major}</span>
            <span>•</span>
            <span>{profile.year}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {getGreeting()}, {profile.name}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-lg">
            Your AI Study Assistant has balanced today's schedule around your peak energy.
          </p>
        </div>

        {/* Quick Metrics Cluster */}
        <div className="flex items-center gap-3 relative z-10">
          {/* Streak pill */}
          <div
            onClick={() => setCurrentScreen('progress')}
            className="flex flex-col items-center justify-center px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 cursor-pointer transition"
          >
            <div className="flex items-center gap-1.5 text-amber-300 font-extrabold text-lg">
              <Flame className="w-5 h-5 fill-amber-400" />
              <span>{profile.currentStreak}</span>
            </div>
            <span className="text-[10px] text-indigo-200 font-medium">Day Streak</span>
          </div>

          {/* Today Goal Progress */}
          <div
            onClick={() => setCurrentScreen('progress')}
            className="flex flex-col items-center justify-center px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 cursor-pointer transition"
          >
            <div className="text-lg font-extrabold text-white">
              {todayStudiedMinutes}m
              <span className="text-xs text-indigo-200 font-normal"> / {profile.dailyGoalMinutes}m</span>
            </div>
            <div className="w-20 bg-white/20 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${goalProgressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Smart Recommendation Card (Design Thinking Ideate) */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-2 border-indigo-200 shadow-soft relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-500/30 shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md">
                  AI Personalized Recommendation
                </span>
                {latestMood && (
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <HeartPulse className="w-3 h-3 text-rose-500" />
                    <span>Mood: {latestMood.mood}</span>
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                {aiRec.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                {aiRec.body}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Action Row */}
        <div className="mt-4 pt-3 border-t border-indigo-100/80 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => setCurrentScreen('timer')}
            className="px-5 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:brightness-110 flex items-center gap-2 transition"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{aiRec.actionLabel}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('exams')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition"
          >
            <span>View Syllabus & Exam Deadlines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Today's Study Plan + Urgent Tasks & Exam Countdown */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's AI Study Plan */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <h2 className="text-base font-extrabold text-slate-900">
                Today's Study Plan
              </h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {todayPlanItems.filter(i => i.isCompleted).length} / {todayPlanItems.length} Done
              </span>
            </div>

            <button
              onClick={() => setCurrentScreen('planner')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition"
            >
              <span>Full Weekly Plan</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5">
            {todayPlanItems.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
                <p className="text-xs text-slate-500 mb-2">No study sessions scheduled for today yet.</p>
                <button
                  onClick={() => setCurrentScreen('planner')}
                  className="px-4 py-2 rounded-xl gradient-brand text-white text-xs font-bold"
                >
                  Generate AI Daily Plan
                </button>
              </div>
            ) : (
              todayPlanItems.map(item => (
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
                          {item.timeSlot}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          {item.type.replace('_', ' ')}
                        </span>
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
                        title="Start Pomodoro Timer for this session"
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

        {/* Right 1 Col: Upcoming Exam Countdown & Urgent Tasks & Quick Action */}
        <div className="space-y-4">
          {/* Quick Start Focus Launcher Card */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
                Focus Engine
              </span>
              <Clock className="w-4 h-4 text-indigo-400" />
            </div>
            <h3 className="text-base font-bold mb-1">
              Ready for Deep Work?
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Launch a 25-minute Pomodoro block with ambient Lo-Fi rain sounds to eliminate distractions.
            </p>
            <button
              onClick={() => setCurrentScreen('timer')}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-indigo-600/30"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Quick Start Focus Timer</span>
            </button>
          </div>

          {/* Exam Countdown Card */}
          {nearestExam && (
            <div
              onClick={() => setCurrentScreen('exams')}
              className="p-4 rounded-2xl bg-white border border-rose-200/80 shadow-xs cursor-pointer hover:border-rose-400 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                  Exam Countdown
                </span>
                <span className="text-xs font-extrabold text-rose-600">
                  {daysUntilExam} Days Left
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {nearestExam.subjectName} ({nearestExam.subjectCode})
              </h4>
              <p className="text-[11px] text-slate-500 mt-1">
                {nearestExam.syllabusTopics.filter(t => t.completed).length} of {nearestExam.syllabusTopics.length} syllabus topics mastered.
              </p>
            </div>
          )}

          {/* Mood Check-in Invitation */}
          <div
            onClick={() => setCurrentScreen('mood')}
            className="p-4 rounded-2xl bg-white border border-purple-200/80 shadow-xs cursor-pointer hover:border-purple-400 transition"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                <HeartPulse className="w-3 h-3 text-purple-600" />
                <span>Daily Wellness</span>
              </span>
              <span className="text-xs font-bold text-purple-600">Check In</span>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              {latestMood
                ? `Last check-in: feeling ${latestMood.mood} (Stress: ${latestMood.stressScore}/10)`
                : 'How are you feeling today? Tap to record mood & adapt schedule.'}
            </p>
          </div>

          {/* Urgent Tasks Quick Peek */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800">High Priority Deadlines</span>
              <button
                onClick={() => setCurrentScreen('tasks')}
                className="text-[11px] text-indigo-600 font-bold hover:underline"
              >
                View all ({tasks.filter(t => !t.isCompleted).length})
              </button>
            </div>
            <div className="space-y-2">
              {urgentTasks.slice(0, 2).map(task => (
                <div key={task.id} className="text-xs p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-slate-800 truncate">{task.title}</span>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded text-rose-700 bg-rose-50">
                      {task.aiPriorityLabel}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{task.subjectName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
