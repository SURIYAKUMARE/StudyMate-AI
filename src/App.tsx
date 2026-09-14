import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Navigation } from './components/common/Navigation';
import { DesignThinkingModal } from './components/common/DesignThinkingModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { MobileFrameWrapper } from './components/common/MobileFrameWrapper';

// 12 Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { PlannerScreen } from './components/screens/PlannerScreen';
import { TasksScreen } from './components/screens/TasksScreen';
import { TimerScreen } from './components/screens/TimerScreen';
import { MoodScreen } from './components/screens/MoodScreen';
import { ChatScreen } from './components/screens/ChatScreen';
import { ProgressScreen } from './components/screens/ProgressScreen';
import { ExamsScreen } from './components/screens/ExamsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

export const App: React.FC = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <AuthScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'home':
        return <HomeScreen />;
      case 'planner':
        return <PlannerScreen />;
      case 'tasks':
        return <TasksScreen />;
      case 'timer':
        return <TimerScreen />;
      case 'mood':
        return <MoodScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'progress':
        return <ProgressScreen />;
      case 'exams':
        return <ExamsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  // Full-screen flows: Splash, Login, Onboarding
  if (
    currentScreen === 'splash' ||
    currentScreen === 'login' ||
    currentScreen === 'onboarding'
  ) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        {renderScreen()}
        <DesignThinkingModal />
      </div>
    );
  }

  return (
    <MobileFrameWrapper>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
        {/* Top Header */}
        <Header />

        {/* Main Application Body */}
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {/* Navigation (Sidebar on Desktop) */}
          <Navigation />

          {/* Screen Content Viewport */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-5xl">
            {renderScreen()}
          </main>
        </div>

        {/* Common Modals & Drawers */}
        <DesignThinkingModal />
        <NotificationDrawer />
      </div>
    </MobileFrameWrapper>
  );
};
