import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { soundManager } from '../../utils/soundEffects';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Coffee,
  CheckCircle2,
  CloudRain,
  Radio,
  Wind
} from 'lucide-react';

export const TimerScreen: React.FC = () => {
  const { subjects, logFocusSession, todayStudiedMinutes } = useApp();

  const [mode, setMode] = useState<'focus' | 'short_break' | 'long_break'>('focus');
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.name || 'Advanced Calculus');

  // Durations in minutes
  const [focusDuration, setFocusDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);

  const [timeLeft, setTimeLeft] = useState(focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Ambient sound
  const [ambientSound, setAmbientSound] = useState<'none' | 'rain' | 'lofi' | 'whitenoise'>('none');

  const totalTime =
    mode === 'focus'
      ? focusDuration * 60
      : mode === 'short_break'
      ? shortBreakDuration * 60
      : longBreakDuration * 60;

  // Sync timeLeft when switching modes or duration
  useEffect(() => {
    setIsRunning(false);
    if (mode === 'focus') setTimeLeft(focusDuration * 60);
    if (mode === 'short_break') setTimeLeft(shortBreakDuration * 60);
    if (mode === 'long_break') setTimeLeft(longBreakDuration * 60);
  }, [mode, focusDuration, shortBreakDuration, longBreakDuration]);

  // Timer Tick effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Completed!
      soundManager.playChime('complete');
      setIsRunning(false);
      const minutesSpent = Math.round(totalTime / 60);
      logFocusSession(minutesSpent, mode, selectedSubject);

      // Auto switch or alert
      if (mode === 'focus') {
        setMode('short_break');
      } else {
        setMode('focus');
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, totalTime, selectedSubject, logFocusSession]);

  // Handle ambient sound changes
  const toggleAmbient = (type: 'rain' | 'lofi' | 'whitenoise') => {
    if (ambientSound === type) {
      soundManager.stopAmbient();
      setAmbientSound('none');
    } else {
      soundManager.startAmbient(type);
      setAmbientSound(type);
    }
  };

  const toggleTimer = () => {
    if (!isRunning) {
      soundManager.playChime('start');
      setIsRunning(true);
    } else {
      soundManager.playChime('pause');
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Circular progress calculation
  const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Design Thinking: Flow & Focus</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Pomodoro Focus Timer</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Structured intervals reduce procrastination friction and maintain high cognitive sharpness.
          </p>
        </div>

        {/* Today Focus Tally */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-indigo-50/70 border border-indigo-100 rounded-2xl">
          <div className="text-xs font-bold text-indigo-900">
            Today: <span className="text-sm font-extrabold text-indigo-600">{todayStudiedMinutes} mins</span>
          </div>
        </div>
      </div>

      {/* Main Timer Layout */}
      <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card text-center space-y-6">
        {/* Mode Selector Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-bold gap-1">
          <button
            onClick={() => setMode('focus')}
            className={`flex-1 py-2 rounded-xl transition ${
              mode === 'focus'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Deep Focus ({focusDuration}m)
          </button>
          <button
            onClick={() => setMode('short_break')}
            className={`flex-1 py-2 rounded-xl transition ${
              mode === 'short_break'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Short Break ({shortBreakDuration}m)
          </button>
          <button
            onClick={() => setMode('long_break')}
            className={`flex-1 py-2 rounded-xl transition ${
              mode === 'long_break'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Long Break ({longBreakDuration}m)
          </button>
        </div>

        {/* Subject Attribution Selector */}
        {mode === 'focus' && (
          <div className="flex items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Studying for:</span>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="px-3 py-1 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-800 text-xs focus:ring-1 focus:ring-indigo-500"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Circular Progress Gauge */}
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            {/* Track */}
            <circle
              cx="128"
              cy="128"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              className="text-slate-100"
              fill="transparent"
            />
            {/* Progress Bar */}
            <circle
              cx="128"
              cy="128"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              className={`transition-all duration-500 ${
                mode === 'focus'
                  ? 'text-indigo-600'
                  : mode === 'short_break'
                  ? 'text-emerald-500'
                  : 'text-purple-600'
              }`}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Time & State Overlay */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-slate-900 tracking-tight font-mono">
              {formatTime(timeLeft)}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">
              {isRunning ? 'Session in Progress' : 'Paused / Ready'}
            </span>
          </div>
        </div>

        {/* Primary Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={resetTimer}
            className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            title="Reset timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTimer}
            className={`px-8 py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg flex items-center gap-2 transition active:scale-95 ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
                : 'gradient-brand shadow-indigo-600/30 hover:brightness-110'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause Session</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Start Focus</span>
              </>
            )}
          </button>
        </div>

        {/* Ambient Sound Scapes (Web Audio API) */}
        <div className="pt-4 border-t border-slate-100">
          <span className="block text-xs font-bold text-slate-600 mb-2">
            Ambient Focus Soundscapes (Audio Synth)
          </span>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => toggleAmbient('rain')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                ambientSound === 'rain'
                  ? 'bg-sky-100 text-sky-800 border border-sky-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>Rainfall</span>
            </button>

            <button
              onClick={() => toggleAmbient('lofi')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                ambientSound === 'lofi'
                  ? 'bg-purple-100 text-purple-800 border border-purple-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Lo-Fi Hum</span>
            </button>

            <button
              onClick={() => toggleAmbient('whitenoise')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                ambientSound === 'whitenoise'
                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>White Noise</span>
            </button>

            {ambientSound !== 'none' && (
              <button
                onClick={() => {
                  soundManager.stopAmbient();
                  setAmbientSound('none');
                }}
                className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 transition"
                title="Mute ambient"
              >
                <VolumeX className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Duration Customizer */}
        <div className="pt-2 text-xs text-slate-400">
          <span>Preset Durations: </span>
          <button
            onClick={() => setFocusDuration(15)}
            className="hover:text-indigo-600 font-medium underline mx-1"
          >
            15m Sprint
          </button>
          <span>•</span>
          <button
            onClick={() => setFocusDuration(25)}
            className="hover:text-indigo-600 font-medium underline mx-1"
          >
            25m Standard
          </button>
          <span>•</span>
          <button
            onClick={() => setFocusDuration(50)}
            className="hover:text-indigo-600 font-medium underline mx-1"
          >
            50m Deep Work
          </button>
        </div>
      </div>
    </div>
  );
};
