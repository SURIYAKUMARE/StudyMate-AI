import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ScreenType,
  StudentProfile,
  Subject,
  Task,
  StudyPlanItem,
  Exam,
  MoodCheckIn,
  NotificationItem,
  FocusSessionLog,
  MoodType
} from '../types';
import {
  initialProfile,
  initialSubjects,
  initialTasks,
  initialStudyPlan,
  initialExams,
  initialMoodLogs,
  initialNotifications,
  initialFocusSessions
} from '../data/sampleData';
import { calculateAIPriority, getMoodRecommendations, rescheduleMissedSessions } from '../utils/aiEngine';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/soundEffects';

interface AppContextType {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  deviceMode: 'mobile' | 'web';
  setDeviceMode: (mode: 'mobile' | 'web') => void;
  profile: StudentProfile;
  updateProfile: (updated: Partial<StudentProfile>) => void;
  subjects: Subject[];
  tasks: Task[];
  addTask: (task: {
    title: string;
    description: string;
    category: Task['category'];
    subjectId: string;
    subjectName: string;
    dueDate: string;
    estimatedHours: number;
    difficulty: Task['difficulty'];
    importance: Task['importance'];
  }) => void;
  toggleTaskComplete: (id: string) => void;
  deleteTask: (id: string) => void;
  studyPlan: StudyPlanItem[];
  togglePlanItem: (id: string) => void;
  setStudyPlan: React.Dispatch<React.SetStateAction<StudyPlanItem[]>>;
  handleRescheduleMissed: () => string;
  exams: Exam[];
  toggleExamTopic: (examId: string, topicId: string) => void;
  moodLogs: MoodCheckIn[];
  latestMood: MoodCheckIn | null;
  addMoodCheckIn: (mood: MoodType, stressScore: number, energyLevel: number, tags: string[]) => MoodCheckIn;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  unreadNotifsCount: number;
  focusSessions: FocusSessionLog[];
  logFocusSession: (durationMinutes: number, mode: 'focus' | 'short_break' | 'long_break', subjectName: string) => void;
  todayStudiedMinutes: number;
  isDesignThinkingModalOpen: boolean;
  setIsDesignThinkingModalOpen: (open: boolean) => void;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  resetAppData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & View Mode
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'web'>('web');

  // Modals
  const [isDesignThinkingModalOpen, setIsDesignThinkingModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Core App State with LocalStorage fallback
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('studymate_profile');
    return saved ? JSON.parse(saved) : initialProfile;
  });

  const [subjects] = useState<Subject[]>(initialSubjects);

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('studymate_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [studyPlan, setStudyPlan] = useState<StudyPlanItem[]>(() => {
    const saved = localStorage.getItem('studymate_study_plan');
    return saved ? JSON.parse(saved) : initialStudyPlan;
  });

  const [exams, setExams] = useState<Exam[]>(() => {
    const saved = localStorage.getItem('studymate_exams');
    return saved ? JSON.parse(saved) : initialExams;
  });

  const [moodLogs, setMoodLogs] = useState<MoodCheckIn[]>(() => {
    const saved = localStorage.getItem('studymate_mood_logs');
    return saved ? JSON.parse(saved) : initialMoodLogs;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('studymate_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [focusSessions, setFocusSessions] = useState<FocusSessionLog[]>(() => {
    const saved = localStorage.getItem('studymate_focus_sessions');
    return saved ? JSON.parse(saved) : initialFocusSessions;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('studymate_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('studymate_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('studymate_study_plan', JSON.stringify(studyPlan));
  }, [studyPlan]);

  useEffect(() => {
    localStorage.setItem('studymate_exams', JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem('studymate_mood_logs', JSON.stringify(moodLogs));
  }, [moodLogs]);

  useEffect(() => {
    localStorage.setItem('studymate_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('studymate_focus_sessions', JSON.stringify(focusSessions));
  }, [focusSessions]);

  // Profile actions
  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  // Task actions
  const addTask = (newTaskData: {
    title: string;
    description: string;
    category: Task['category'];
    subjectId: string;
    subjectName: string;
    dueDate: string;
    estimatedHours: number;
    difficulty: Task['difficulty'];
    importance: Task['importance'];
  }) => {
    const { score, label } = calculateAIPriority(
      newTaskData.dueDate,
      newTaskData.difficulty,
      newTaskData.importance
    );

    const newTask: Task = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      aiPriorityScore: score,
      aiPriorityLabel: label,
      isCompleted: false
    };

    setTasks(prev => [newTask, ...prev]);

    // Send notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Task Added with AI Priority',
        message: `"${newTask.title}" was ranked as ${newTask.aiPriorityLabel} priority (${newTask.aiPriorityScore}/100).`,
        type: 'deadline',
        timestamp: 'Just now',
        isRead: false,
        targetScreen: 'tasks'
      },
      ...prev
    ]);
  };

  const toggleTaskComplete = (id: string) => {
    soundManager.playChime('complete');
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextState = !t.isCompleted;
          if (nextState) {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.75 }
            });
          }
          return {
            ...t,
            isCompleted: nextState,
            completedAt: nextState ? new Date().toISOString() : undefined
          };
        }
        return t;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Study Plan actions
  const togglePlanItem = (id: string) => {
    soundManager.playChime('click');
    setStudyPlan(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextVal = !p.isCompleted;
          if (nextVal) {
            confetti({ particleCount: 35, spread: 45 });
          }
          return { ...p, isCompleted: nextVal };
        }
        return p;
      })
    );
  };

  const handleRescheduleMissed = () => {
    const { updatedPlan, message } = rescheduleMissedSessions(studyPlan);
    setStudyPlan(updatedPlan);
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'AI Plan Rescheduled',
        message,
        type: 'session',
        timestamp: 'Just now',
        isRead: false,
        targetScreen: 'planner'
      },
      ...prev
    ]);
    return message;
  };

  // Exam topic toggle
  const toggleExamTopic = (examId: string, topicId: string) => {
    setExams(prev =>
      prev.map(ex => {
        if (ex.id === examId) {
          return {
            ...ex,
            syllabusTopics: ex.syllabusTopics.map(top =>
              top.id === topicId ? { ...top, completed: !top.completed } : top
            )
          };
        }
        return ex;
      })
    );
  };

  // Mood logging
  const addMoodCheckIn = (
    mood: MoodType,
    stressScore: number,
    energyLevel: number,
    tags: string[]
  ): MoodCheckIn => {
    const { wellnessAdvice, scheduleAdaptation } = getMoodRecommendations(mood, stressScore);
    const newCheckIn: MoodCheckIn = {
      id: `mood-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mood,
      stressScore,
      energyLevel,
      tags,
      aiWellnessAdvice: wellnessAdvice,
      aiScheduleAdaptation: scheduleAdaptation
    };

    setMoodLogs(prev => [newCheckIn, ...prev]);

    // Send supportive wellness notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: `Mood Recorded: ${mood.toUpperCase()}`,
        message: wellnessAdvice.slice(0, 100) + '...',
        type: 'wellness',
        timestamp: 'Just now',
        isRead: false,
        targetScreen: 'mood'
      },
      ...prev
    ]);

    return newCheckIn;
  };

  const latestMood = moodLogs.length > 0 ? moodLogs[0] : null;

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadNotifsCount = notifications.filter(n => !n.isRead).length;

  // Focus Sessions logging
  const logFocusSession = (
    durationMinutes: number,
    mode: 'focus' | 'short_break' | 'long_break',
    subjectName: string
  ) => {
    const newSession: FocusSessionLog = {
      id: `sess-${Date.now()}`,
      timestamp: new Date().toISOString(),
      durationMinutes,
      mode,
      subjectName
    };

    setFocusSessions(prev => [newSession, ...prev]);

    if (mode === 'focus') {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      soundManager.playChime('complete');
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayStudiedMinutes = focusSessions
    .filter(s => s.mode === 'focus' && s.timestamp.startsWith(todayStr))
    .reduce((acc, curr) => acc + curr.durationMinutes, 0);

  // Reset Application Data
  const resetAppData = () => {
    setProfile(initialProfile);
    setTasks(initialTasks);
    setStudyPlan(initialStudyPlan);
    setExams(initialExams);
    setMoodLogs(initialMoodLogs);
    setNotifications(initialNotifications);
    setFocusSessions(initialFocusSessions);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        deviceMode,
        setDeviceMode,
        profile,
        updateProfile,
        subjects,
        tasks,
        addTask,
        toggleTaskComplete,
        deleteTask,
        studyPlan,
        togglePlanItem,
        setStudyPlan,
        handleRescheduleMissed,
        exams,
        toggleExamTopic,
        moodLogs,
        latestMood,
        addMoodCheckIn,
        notifications,
        markNotificationRead,
        clearAllNotifications,
        unreadNotifsCount,
        focusSessions,
        logFocusSession,
        todayStudiedMinutes,
        isDesignThinkingModalOpen,
        setIsDesignThinkingModalOpen,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        resetAppData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
