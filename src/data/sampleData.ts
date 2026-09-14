import { StudentProfile, Subject, Task, StudyPlanItem, Exam, MoodCheckIn, NotificationItem, FocusSessionLog } from '../types';

// Dynamically generate dates relative to today
const getFutureDate = (daysAhead: number, hours = 9, minutes = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
};

const getTodayDateStr = (offsetDays = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const initialProfile: StudentProfile = {
  id: 'student-alex-chen',
  name: 'Alex Chen',
  email: 'alex.chen@university.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  university: 'Stanford University / College of Engineering',
  major: 'Computer Science & Mathematics',
  year: 'Junior (3rd Year)',
  targetGpa: '3.85 / 4.0',
  studyChallenges: [
    'Procrastination on complex problem sets',
    'Multiple overlapping assignment deadlines',
    'Pre-exam anxiety and cognitive fatigue',
    'Difficulty maintaining consistent daily study blocks'
  ],
  dailyGoalMinutes: 180,
  peakEnergyTime: 'morning',
  currentStreak: 6,
  longestStreak: 14,
  lastStudiedDate: getTodayDateStr(0),
  productivityScore: 84
};

export const initialSubjects: Subject[] = [
  {
    id: 'sub-math301',
    name: 'Advanced Calculus',
    code: 'MATH 301',
    color: '#6366f1', // brand indigo
    icon: 'Calculator',
    targetHoursWeekly: 8,
    completedHoursWeekly: 6.5
  },
  {
    id: 'sub-cs201',
    name: 'Data Structures & Algorithms',
    code: 'CS 201',
    color: '#a855f7', // purple
    icon: 'Binary',
    targetHoursWeekly: 10,
    completedHoursWeekly: 8
  },
  {
    id: 'sub-cs310',
    name: 'Operating Systems',
    code: 'CS 310',
    color: '#0284c7', // sky
    icon: 'Cpu',
    targetHoursWeekly: 7,
    completedHoursWeekly: 4.5
  },
  {
    id: 'sub-cs320',
    name: 'Database Management',
    code: 'CS 320',
    color: '#059669', // emerald
    icon: 'Database',
    targetHoursWeekly: 5,
    completedHoursWeekly: 4
  }
];

export const initialExams: Exam[] = [
  {
    id: 'exam-math301',
    subjectId: 'sub-math301',
    subjectName: 'Advanced Calculus',
    subjectCode: 'MATH 301',
    examDate: getFutureDate(5, 10, 0), // 5 days away!
    location: 'Hall 4B, Science Quad',
    weightPercentage: 35,
    syllabusTopics: [
      { id: 't1', title: 'Multivariable Limits & Continuity', completed: true },
      { id: 't2', title: 'Partial Derivatives & Chain Rule', completed: true },
      { id: 't3', title: 'Lagrange Multipliers & Optimization', completed: true },
      { id: 't4', title: 'Multiple Integrals & Vector Fields', completed: false },
      { id: 't5', title: 'Green & Stokes Theorem Applications', completed: false }
    ]
  },
  {
    id: 'exam-cs201',
    subjectId: 'sub-cs201',
    subjectName: 'Data Structures & Algorithms',
    subjectCode: 'CS 201',
    examDate: getFutureDate(12, 14, 0),
    location: 'Turing Hall, CS Building',
    weightPercentage: 40,
    syllabusTopics: [
      { id: 't6', title: 'Asymptotic Analysis & Master Theorem', completed: true },
      { id: 't7', title: 'AVL Trees & Red-Black Trees', completed: true },
      { id: 't8', title: 'Graph Algorithms (Dijkstra & A*)', completed: false },
      { id: 't9', title: 'Dynamic Programming & Memoization', completed: false }
    ]
  },
  {
    id: 'exam-cs310',
    subjectId: 'sub-cs310',
    subjectName: 'Operating Systems',
    subjectCode: 'CS 310',
    examDate: getFutureDate(19, 9, 30),
    location: 'Auditorium 2',
    weightPercentage: 30,
    syllabusTopics: [
      { id: 't10', title: 'Process Scheduling & Threads', completed: true },
      { id: 't11', title: 'Deadlock Detection & Semaphores', completed: false },
      { id: 't12', title: 'Virtual Memory & Page Replacement', completed: false }
    ]
  }
];

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Complete Multivariable Calculus Problem Set #4',
    description: 'Solve problems on Taylor series and double integrals in polar coordinates.',
    category: 'assignment',
    subjectId: 'sub-math301',
    subjectName: 'Advanced Calculus',
    dueDate: getFutureDate(2, 23, 59),
    estimatedHours: 2.5,
    difficulty: 'hard',
    importance: 'high',
    aiPriorityScore: 96,
    aiPriorityLabel: 'Critical',
    isCompleted: false
  },
  {
    id: 'task-2',
    title: 'Implement Red-Black Tree Balancing in C++',
    description: 'Write self-balancing logic for insertion and rotation cases with unit test suite.',
    category: 'project',
    subjectId: 'sub-cs201',
    subjectName: 'Data Structures & Algorithms',
    dueDate: getFutureDate(3, 18, 0),
    estimatedHours: 4,
    difficulty: 'hard',
    importance: 'high',
    aiPriorityScore: 89,
    aiPriorityLabel: 'High',
    isCompleted: false
  },
  {
    id: 'task-3',
    title: 'Review Chapter 6: Dining Philosophers Semaphore Lab',
    description: 'Analyze race conditions and write deadlock prevention pseudocode.',
    category: 'assignment',
    subjectId: 'sub-cs310',
    subjectName: 'Operating Systems',
    dueDate: getFutureDate(6, 12, 0),
    estimatedHours: 2,
    difficulty: 'medium',
    importance: 'medium',
    aiPriorityScore: 68,
    aiPriorityLabel: 'Medium',
    isCompleted: false
  },
  {
    id: 'task-4',
    title: 'BCNF Database Schema Normalization Exercise',
    description: 'Decompose relation schema into Boyce-Codd Normal Form with functional dependencies.',
    category: 'assignment',
    subjectId: 'sub-cs320',
    subjectName: 'Database Management',
    dueDate: getFutureDate(8, 23, 59),
    estimatedHours: 1.5,
    difficulty: 'easy',
    importance: 'low',
    aiPriorityScore: 42,
    aiPriorityLabel: 'Low',
    isCompleted: true,
    completedAt: getTodayDateStr(0)
  },
  {
    id: 'task-5',
    title: 'Read Research Paper on Distributed Consensus',
    description: 'Annotate key takeaways from the Raft paper for Friday recitation.',
    category: 'personal',
    subjectId: 'sub-cs310',
    subjectName: 'Operating Systems',
    dueDate: getFutureDate(4, 15, 0),
    estimatedHours: 1.5,
    difficulty: 'medium',
    importance: 'medium',
    aiPriorityScore: 64,
    aiPriorityLabel: 'Medium',
    isCompleted: false
  }
];

export const initialStudyPlan: StudyPlanItem[] = [
  {
    id: 'plan-1',
    date: getTodayDateStr(0),
    timeSlot: '09:00 - 10:00',
    subjectId: 'sub-math301',
    subjectName: 'Advanced Calculus',
    topicTitle: 'Double Integrals in Polar Coordinates',
    durationMinutes: 60,
    type: 'practice',
    isCompleted: true,
    priority: 'high'
  },
  {
    id: 'plan-2',
    date: getTodayDateStr(0),
    timeSlot: '10:30 - 11:30',
    subjectId: 'sub-cs201',
    subjectName: 'Data Structures & Algorithms',
    topicTitle: 'Red-Black Tree Left & Right Rotations',
    durationMinutes: 60,
    type: 'deep_work',
    isCompleted: false,
    priority: 'high'
  },
  {
    id: 'plan-3',
    date: getTodayDateStr(0),
    timeSlot: '14:00 - 14:45',
    subjectId: 'sub-cs310',
    subjectName: 'Operating Systems',
    topicTitle: 'Semaphore Primitives & Race Conditions',
    durationMinutes: 45,
    type: 'active_recall',
    isCompleted: false,
    priority: 'medium'
  },
  {
    id: 'plan-4',
    date: getTodayDateStr(0),
    timeSlot: '16:00 - 16:35',
    subjectId: 'sub-math301',
    subjectName: 'Advanced Calculus',
    topicTitle: 'Midterm Formula Sheet Quick Revision',
    durationMinutes: 35,
    type: 'revision',
    isCompleted: false,
    priority: 'high'
  },
  {
    id: 'plan-5',
    date: getTodayDateStr(1),
    timeSlot: '09:00 - 10:15',
    subjectId: 'sub-math301',
    subjectName: 'Advanced Calculus',
    topicTitle: 'Green Theorem Line Integrals Practice',
    durationMinutes: 75,
    type: 'deep_work',
    isCompleted: false,
    priority: 'high'
  },
  {
    id: 'plan-6',
    date: getTodayDateStr(1),
    timeSlot: '11:00 - 12:00',
    subjectId: 'sub-cs201',
    subjectName: 'Data Structures & Algorithms',
    topicTitle: 'Dijkstra Shortest Path Proofs',
    durationMinutes: 60,
    type: 'practice',
    isCompleted: false,
    priority: 'medium'
  }
];

export const initialMoodLogs: MoodCheckIn[] = [
  {
    id: 'mood-1',
    date: getTodayDateStr(-2),
    timestamp: '19:40',
    mood: 'normal',
    stressScore: 4,
    energyLevel: 3,
    tags: ['Moderate Workload', 'Good Rest'],
    aiWellnessAdvice: 'Consistent steady pacing keeps stress low. Keep regular hydration breaks.',
    aiScheduleAdaptation: 'Standard 45-minute study intervals maintained.'
  },
  {
    id: 'mood-2',
    date: getTodayDateStr(-1),
    timestamp: '21:15',
    mood: 'stressed',
    stressScore: 7,
    energyLevel: 2,
    tags: ['Calculus Deadline', 'Late Night Study'],
    aiWellnessAdvice: 'High cognitive tension detected. Try a 4-7-8 breathing session and avoid late-night caffeine.',
    aiScheduleAdaptation: 'AI inserted a 15-minute buffer and prioritized hardest topics for morning energy.'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Exam Alert: 5 Days Remaining',
    message: 'Your Advanced Calculus Midterm is in 5 days. AI recommended revision sessions generated.',
    type: 'exam',
    timestamp: '15 mins ago',
    isRead: false,
    targetScreen: 'exams'
  },
  {
    id: 'notif-2',
    title: 'Assignment Deadline Tomorrow',
    message: 'Calculus Problem Set #4 is due in 48 hours. Priority marked as Critical.',
    type: 'deadline',
    timestamp: '1 hour ago',
    isRead: false,
    targetScreen: 'tasks'
  },
  {
    id: 'notif-3',
    title: 'Study Streak Intact: 6 Days! 🔥',
    message: 'Complete today’s planned sessions to unlock your 7-day Weekly Master badge.',
    type: 'session',
    timestamp: '4 hours ago',
    isRead: true,
    targetScreen: 'progress'
  },
  {
    id: 'notif-4',
    title: 'Time for a Mindful Break',
    message: 'You have focused for 50 minutes. Stretch, drink water, and rest your eyes.',
    type: 'break',
    timestamp: 'Yesterday',
    isRead: true,
    targetScreen: 'timer'
  }
];

export const initialFocusSessions: FocusSessionLog[] = [
  {
    id: 'sess-1',
    timestamp: getTodayDateStr(0) + ' 09:15',
    durationMinutes: 25,
    mode: 'focus',
    subjectName: 'Advanced Calculus'
  },
  {
    id: 'sess-2',
    timestamp: getTodayDateStr(0) + ' 09:45',
    durationMinutes: 25,
    mode: 'focus',
    subjectName: 'Advanced Calculus'
  },
  {
    id: 'sess-3',
    timestamp: getTodayDateStr(-1) + ' 14:00',
    durationMinutes: 50,
    mode: 'focus',
    subjectName: 'Data Structures & Algorithms'
  },
  {
    id: 'sess-4',
    timestamp: getTodayDateStr(-1) + ' 16:30',
    durationMinutes: 25,
    mode: 'focus',
    subjectName: 'Operating Systems'
  },
  {
    id: 'sess-5',
    timestamp: getTodayDateStr(-2) + ' 10:00',
    durationMinutes: 50,
    mode: 'focus',
    subjectName: 'Database Management'
  }
];
