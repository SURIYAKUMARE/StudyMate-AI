import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Clock,
  Calendar,
  CheckCircle2,
  Circle,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  MapPin,
  Percent
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ExamsScreen: React.FC = () => {
  const { exams, toggleExamTopic, setStudyPlan, setCurrentScreen } = useApp();

  // Real-time ticking state for seconds countdown
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateCountdown = (targetDateStr: string) => {
    const diff = new Date(targetDateStr).getTime() - now;
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds, isPassed: false };
  };

  const handleTopicCheck = (examId: string, topicId: string) => {
    toggleExamTopic(examId, topicId);
    confetti({ particleCount: 30, spread: 50 });
  };

  const handleGenerateRevision = (examName: string) => {
    confetti({ particleCount: 60, spread: 70 });
    setCurrentScreen('planner');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Design Thinking: Exam Pressure Reduction</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Exams & Countdown Timers</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time countdown clocks and syllabus milestone tracking keep you proactive without panic cramming.
          </p>
        </div>
      </div>

      {/* Exam Cards Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {exams.map(exam => {
          const cd = calculateCountdown(exam.examDate);
          const completedTopics = exam.syllabusTopics.filter(t => t.completed).length;
          const totalTopics = exam.syllabusTopics.length;
          const progressPercent = Math.round((completedTopics / (totalTopics || 1)) * 100);

          const isUrgent = cd.days <= 5;

          return (
            <div
              key={exam.id}
              className={`rounded-3xl p-6 border transition-all shadow-soft bg-white ${
                isUrgent ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200'
              }`}
            >
              {/* Top Row: Subject & Urgency Badge */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                      {exam.subjectCode}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                      <Percent className="w-3 h-3 text-slate-400" />
                      <span>{exam.weightPercentage}% Course Weight</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900">{exam.subjectName}</h3>
                </div>

                {isUrgent ? (
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>High Urgency</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    Scheduled
                  </span>
                )}
              </div>

              {/* Countdown Clocks Block */}
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-4 mb-5 shadow-xs">
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 mb-2 flex items-center justify-between">
                  <span>Live Countdown</span>
                  <span>{new Date(exam.examDate).toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center font-mono">
                  <div className="bg-white/10 rounded-xl p-2">
                    <div className="text-2xl sm:text-3xl font-black text-white">{cd.days}</div>
                    <div className="text-[9px] uppercase tracking-wider text-indigo-200">Days</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2">
                    <div className="text-2xl sm:text-3xl font-black text-white">{cd.hours}</div>
                    <div className="text-[9px] uppercase tracking-wider text-indigo-200">Hours</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2">
                    <div className="text-2xl sm:text-3xl font-black text-white">{cd.minutes}</div>
                    <div className="text-[9px] uppercase tracking-wider text-indigo-200">Mins</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2">
                    <div className="text-2xl sm:text-3xl font-black text-amber-300">{cd.seconds}</div>
                    <div className="text-[9px] uppercase tracking-wider text-indigo-200">Secs</div>
                  </div>
                </div>
              </div>

              {/* Exam Location & Schedule Meta */}
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{exam.location}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>
                    {new Date(exam.examDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </span>
              </div>

              {/* Syllabus Topic Checklist & Progress */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    Syllabus Mastery ({completedTopics}/{totalTopics})
                  </span>
                  <span className="font-extrabold text-indigo-600">{progressPercent}%</span>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {exam.syllabusTopics.map(topic => (
                    <div
                      key={topic.id}
                      onClick={() => handleTopicCheck(exam.id, topic.id)}
                      className={`p-2 rounded-xl text-xs flex items-center justify-between border cursor-pointer transition ${
                        topic.completed
                          ? 'bg-emerald-50/50 border-emerald-200 text-slate-600'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-indigo-300'
                      }`}
                    >
                      <span className={topic.completed ? 'line-through text-slate-400' : 'font-medium'}>
                        {topic.title}
                      </span>
                      {topic.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleGenerateRevision(exam.subjectName)}
                  className="w-full py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:brightness-110 flex items-center justify-center gap-2 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Revision Blocks in Planner</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
