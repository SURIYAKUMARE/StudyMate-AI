export type ScreenType =
  | 'splash'
  | 'login'
  | 'onboarding'
  | 'home'
  | 'planner'
  | 'tasks'
  | 'timer'
  | 'mood'
  | 'chat'
  | 'progress'
  | 'exams'
  | 'profile';

export type MoodType = 'happy' | 'normal' | 'tired' | 'stressed' | 'anxious';

export type TaskCategory = 'assignment' | 'project' | 'exam' | 'personal';
export type TaskDifficulty = 'easy' | 'medium' | 'hard';
export type TaskImportance = 'high' | 'medium' | 'low';
export type AIPriority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  university: string;
  major: string;
  year: string;
  targetGpa: string;
  studyChallenges: string[];
  dailyGoalMinutes: number;
  peakEnergyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  currentStreak: number;
  longestStreak: number;
  lastStudiedDate: string;
  productivityScore: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  color: string;
  icon: string;
  targetHoursWeekly: number;
  completedHoursWeekly: number;
}

export interface StudyPlanItem {
  id: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:00 - 10:00"
  subjectId: string;
  subjectName: string;
  topicTitle: string;
  durationMinutes: number;
  type: 'deep_work' | 'revision' | 'practice' | 'active_recall' | 'break';
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  subjectId: string;
  subjectName: string;
  dueDate: string; // ISO date string or YYYY-MM-DD
  estimatedHours: number;
  difficulty: TaskDifficulty;
  importance: TaskImportance;
  aiPriorityScore: number; // 0 - 100
  aiPriorityLabel: AIPriority;
  isCompleted: boolean;
  completedAt?: string;
}

export interface MoodCheckIn {
  id: string;
  date: string;
  timestamp: string;
  mood: MoodType;
  stressScore: number; // 1 - 10
  energyLevel: number; // 1 - 5
  tags: string[];
  aiWellnessAdvice: string;
  aiScheduleAdaptation: string;
}

export interface Exam {
  id: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  examDate: string; // ISO or YYYY-MM-DDTHH:mm:ss
  location: string;
  weightPercentage: number;
  syllabusTopics: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'deadline' | 'exam' | 'session' | 'break' | 'wellness';
  timestamp: string;
  isRead: boolean;
  targetScreen?: ScreenType;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  options?: string[];
  category?: 'planner' | 'procrastination' | 'wellness' | 'technique' | 'general';
}

export interface FocusSessionLog {
  id: string;
  timestamp: string;
  durationMinutes: number;
  mode: 'focus' | 'short_break' | 'long_break';
  subjectName: string;
}
