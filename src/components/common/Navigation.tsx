import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenType } from '../../types';
import {
  Home,
  Calendar,
  CheckSquare,
  Timer,
  HeartPulse,
  MessageSquareText,
  BarChart3,
  GraduationCap,
  User,
  Settings,
  MoreHorizontal
} from 'lucide-react';

interface NavItem {
  screen: ScreenType;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
}

export const Navigation: React.FC = () => {
  const { currentScreen, setCurrentScreen, tasks, exams } = useApp();

  // Hide nav on splash, login, onboarding
  if (
    currentScreen === 'splash' ||
    currentScreen === 'login' ||
    currentScreen === 'onboarding'
  ) {
    return null;
  }

  const pendingTasksCount = tasks.filter(t => !t.isCompleted).length;

  const desktopNavItems: NavItem[] = [
    { screen: 'home', label: 'Home Dashboard', icon: Home },
    { screen: 'planner', label: 'AI Study Planner', icon: Calendar },
    {
      screen: 'tasks',
      label: 'Smart Tasks',
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? pendingTasksCount : undefined
    },
    { screen: 'timer', label: 'Focus Timer', icon: Timer },
    { screen: 'mood', label: 'Mood & Stress', icon: HeartPulse },
    { screen: 'chat', label: 'AI Study Tutor', icon: MessageSquareText },
    { screen: 'progress', label: 'Progress Dashboard', icon: BarChart3 },
    {
      screen: 'exams',
      label: 'Exams & Deadlines',
      icon: GraduationCap,
      badge: exams.length > 0 ? exams.length : undefined
    },
    { screen: 'profile', label: 'Profile & Settings', icon: User }
  ];

  // Mobile Bottom Bar has 5 primary actions + More
  const mobilePrimaryNav: NavItem[] = [
    { screen: 'home', label: 'Home', icon: Home },
    { screen: 'planner', label: 'Planner', icon: Calendar },
    { screen: 'timer', label: 'Focus', icon: Timer },
    { screen: 'tasks', label: 'Tasks', icon: CheckSquare, badge: pendingTasksCount },
    { screen: 'chat', label: 'AI Chat', icon: MessageSquareText },
    { screen: 'mood', label: 'Mood', icon: HeartPulse }
  ];

  return (
    <>
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/80 bg-white min-h-[calc(100vh-61px)] p-4 shrink-0">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
          Academic Workflow
        </div>
        <nav className="space-y-1.5 flex-1">
          {desktopNavItems.map(item => {
            const Icon = item.icon;
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => setCurrentScreen(item.screen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom helper card inside sidebar */}
        <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/80">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-indigo-900">AI Assistant Active</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Schedules automatically adapt based on your mood check-in and task progress.
          </p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 px-2 py-1.5 shadow-lg">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {mobilePrimaryNav.map(item => {
            const Icon = item.icon;
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => setCurrentScreen(item.screen)}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl relative transition-all ${
                  isActive
                    ? 'text-indigo-600 font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'scale-110 stroke-[2.2]' : ''}`} />
                  {item.badge && Number(item.badge) > 0 ? (
                    <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-indigo-600 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
