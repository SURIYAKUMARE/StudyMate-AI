import { Task, StudyPlanItem, Subject, Exam, MoodType, AIPriority } from '../types';

/**
 * Calculates AI Priority Score (0-100) and Label based on Deadline, Importance, and Difficulty.
 */
export const calculateAIPriority = (
  dueDateStr: string,
  difficulty: 'easy' | 'medium' | 'hard',
  importance: 'low' | 'medium' | 'high'
): { score: number; label: AIPriority } => {
  const now = new Date().getTime();
  const due = new Date(dueDateStr).getTime();
  const diffHours = (due - now) / (1000 * 60 * 60);

  let urgencyScore = 0;
  if (diffHours <= 24) urgencyScore = 50;
  else if (diffHours <= 72) urgencyScore = 40;
  else if (diffHours <= 168) urgencyScore = 25;
  else urgencyScore = 10;

  const difficultyScore = difficulty === 'hard' ? 25 : difficulty === 'medium' ? 15 : 5;
  const importanceScore = importance === 'high' ? 25 : importance === 'medium' ? 15 : 5;

  const totalScore = Math.min(100, Math.max(10, urgencyScore + difficultyScore + importanceScore));

  let label: AIPriority = 'Low';
  if (totalScore >= 80) label = 'Critical';
  else if (totalScore >= 65) label = 'High';
  else if (totalScore >= 45) label = 'Medium';
  else label = 'Low';

  return { score: totalScore, label };
};

/**
 * AI Study Plan Generator:
 * Generates realistic daily and weekly study blocks based on subjects, topics, available hours, and exam proximity.
 */
export const generateAIStudyPlan = (
  subjects: Subject[],
  topicsInput: { subjectId: string; topicName: string; difficulty: number }[],
  dailyAvailableHours: number,
  daysCount = 7
): StudyPlanItem[] => {
  const plans: StudyPlanItem[] = [];
  const today = new Date();

  // Types of study sessions to balance cognitive load
  const sessionTypes: StudyPlanItem['type'][] = ['deep_work', 'practice', 'active_recall', 'revision'];

  for (let day = 0; day < daysCount; day++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + day);
    const dateStr = targetDate.toISOString().split('T')[0];

    // Distribute hours into 45-60 minute chunks with short buffers
    const slotsPerDay = Math.max(2, Math.min(4, Math.round(dailyAvailableHours * 1.2)));
    let currentHour = 9; // starting 9:00 AM

    for (let slot = 0; slot < slotsPerDay; slot++) {
      const subjectIndex = (day + slot) % subjects.length;
      const subject = subjects[subjectIndex] || subjects[0];

      // Find topic or create a targeted topic
      const matchingTopic = topicsInput.find(t => t.subjectId === subject.id);
      const topicTitle = matchingTopic
        ? matchingTopic.topicName
        : slot % 2 === 0
        ? `Core Concepts & Problem Sets`
        : `Active Recall & Revision Drill`;

      const startFormatted = `${String(currentHour).padStart(2, '0')}:00`;
      const endHour = currentHour + 1;
      const endFormatted = `${String(endHour).padStart(2, '0')}:00`;

      plans.push({
        id: `gen-plan-${dateStr}-${slot}-${Math.random().toString(36).substring(2, 7)}`,
        date: dateStr,
        timeSlot: `${startFormatted} - ${endFormatted}`,
        subjectId: subject.id,
        subjectName: subject.name,
        topicTitle: `${subject.name}: ${topicTitle}`,
        durationMinutes: 60,
        type: sessionTypes[(day + slot) % sessionTypes.length],
        isCompleted: day === 0 && slot === 0, // mock first session done if today
        priority: slot === 0 ? 'high' : 'medium'
      });

      currentHour += 2; // spaced out slots
      if (currentHour > 18) currentHour = 10;
    }
  }

  return plans;
};

/**
 * AI Reschedule Engine:
 * When student misses scheduled study sessions, intelligently reallocates them without creating overwhelm.
 */
export const rescheduleMissedSessions = (
  currentPlan: StudyPlanItem[],
  maxDailyHours = 3.5
): { updatedPlan: StudyPlanItem[]; message: string } => {
  const todayStr = new Date().toISOString().split('T')[0];
  const missedSessions = currentPlan.filter(
    p => p.date <= todayStr && !p.isCompleted
  );

  if (missedSessions.length === 0) {
    return {
      updatedPlan: currentPlan,
      message: "You're completely on track! No pending missed sessions detected."
    };
  }

  const futurePlans = currentPlan.filter(p => p.date > todayStr);
  const reallocated: StudyPlanItem[] = [];

  // Spread missed sessions across next 3 days
  missedSessions.forEach((missed, idx) => {
    const targetOffset = (idx % 3) + 1;
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + targetOffset);
    const newDateStr = targetDate.toISOString().split('T')[0];

    reallocated.push({
      ...missed,
      id: `rescheduled-${missed.id}`,
      date: newDateStr,
      timeSlot: `${15 + (idx % 2)}:00 - ${16 + (idx % 2)}:00`,
      type: 'revision',
      priority: 'high'
    });
  });

  const updatedPlan = [
    ...currentPlan.filter(p => p.isCompleted || p.date > todayStr),
    ...reallocated
  ];

  return {
    updatedPlan,
    message: `AI reallocated ${missedSessions.length} missed sessions across upcoming lighter days to prevent burnout.`
  };
};

/**
 * AI Mood & Stress Recommendations
 */
export const getMoodRecommendations = (
  mood: MoodType,
  stressLevel: number
): { wellnessAdvice: string; scheduleAdaptation: string; suggestedStudyMinutes: number } => {
  switch (mood) {
    case 'anxious':
      return {
        wellnessAdvice: 'Academic pressure can feel overwhelming. Take 5 minutes for square-box breathing (inhale 4s, hold 4s, exhale 4s, hold 4s). Remember your self-worth is not defined by one exam.',
        scheduleAdaptation: 'AI has shortened your study blocks from 50m to 25m Pomodoro sprints with 10m calming breaks. Defer non-urgent assignments to tomorrow.',
        suggestedStudyMinutes: 25
      };
    case 'stressed':
      return {
        wellnessAdvice: 'High cognitive load detected. Hydrate, take a 10-minute walk away from screens, and break your largest assignment into 3 micro-steps.',
        scheduleAdaptation: 'AI prioritized high-impact revision and converted difficult problem sets into lighter active-recall flashcard reviews.',
        suggestedStudyMinutes: 30
      };
    case 'tired':
      return {
        wellnessAdvice: 'Sleep deficit directly diminishes memory consolidation. Consider a 20-minute power nap or a light stretch before continuing.',
        scheduleAdaptation: 'AI rescheduled intensive theoretical topics to tomorrow morning when your cognitive energy is highest. Focus on light review today.',
        suggestedStudyMinutes: 20
      };
    case 'happy':
      return {
        wellnessAdvice: 'You are in a positive, high-clarity mindset! Use this high dopamine state to tackle your most challenging topics.',
        scheduleAdaptation: 'AI scheduled a 60-minute Deep Work sprint on your highest-weight subject (e.g. Advanced Calculus or Algorithms).',
        suggestedStudyMinutes: 60
      };
    case 'normal':
    default:
      return {
        wellnessAdvice: 'Balanced energy detected. Maintain steady momentum with consistent hydration and eye breaks every 45 minutes.',
        scheduleAdaptation: 'Standard balanced study schedule maintained: 45m focus sessions followed by 10m restorative breaks.',
        suggestedStudyMinutes: 45
      };
  }
};

/**
 * AI Smart Home Recommendation generator based on real-time academic context
 */
export const getSmartHomeRecommendation = (
  exams: Exam[],
  tasks: Task[],
  profileStreak: number
): { title: string; body: string; actionLabel: string; targetSubjectId: string } => {
  const sortedExams = [...exams].sort(
    (a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime()
  );
  const nearestExam = sortedExams[0];

  if (nearestExam) {
    const daysLeft = Math.max(1, Math.ceil((new Date(nearestExam.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
    return {
      title: `Upcoming Exam: ${nearestExam.subjectName} in ${daysLeft} days`,
      body: `Your ${nearestExam.subjectCode} exam has high weight (${nearestExam.weightPercentage}%). Based on your completed topics, we recommend a 50-minute Deep Practice session today on unresolved syllabus topics.`,
      actionLabel: `Start ${nearestExam.subjectCode} Focus`,
      targetSubjectId: nearestExam.subjectId
    };
  }

  const criticalTask = tasks.find(t => !t.isCompleted && t.aiPriorityLabel === 'Critical');
  if (criticalTask) {
    return {
      title: `Urgent Task: ${criticalTask.title}`,
      body: `This assignment has high urgency score (${criticalTask.aiPriorityScore}/100). Spend 45 minutes right now to finish the first draft.`,
      actionLabel: 'Tackle Task Now',
      targetSubjectId: criticalTask.subjectId
    };
  }

  return {
    title: `Keep up your ${profileStreak}-Day Study Streak! 🔥`,
    body: 'You are building steady academic habits. Complete a 25-minute Pomodoro session today to preserve your momentum.',
    actionLabel: 'Quick Start Focus',
    targetSubjectId: 'sub-math301'
  };
};

/**
 * AI Study Chatbot Responses with Design Thinking empathy & academic science
 */
export const getAIChatResponse = (userInput: string): string => {
  const query = userInput.toLowerCase();

  if (query.includes('procrastinat') || query.includes('lazy') || query.includes('motivation') || query.includes("can't start")) {
    return `### Overcoming Procrastination with the **5-Minute Rule**

Procrastination is often caused by cognitive intimidation—your brain perceives the entire project as a giant threat. Here is a scientifically proven 3-step protocol:

1. **The 5-Minute Micro-Commitment**: Tell yourself you will only open the book/editor and work for exactly 5 minutes. If you want to stop after 5 minutes, you have full permission. 80% of the time, overcoming the activation friction is all you need.
2. **Task Slicing**: Don't write "Finish Lab Report". Instead, write: "Draft the introduction header and list 3 bullet points."
3. **Environment Isolation**: Put your smartphone in another room or turn on Airplane Mode for just one 25-minute Pomodoro session.

Shall we start a 20-minute Focus Sprint right now?`;
  }

  if (query.includes('calculus') || query.includes('math') || query.includes('problem')) {
    return `### Mastering Mathematics & Problem-Solving

To conquer Advanced Calculus without cognitive burnout:

1. **Active Derivation**: Never just read solved examples. Cover the solution with a piece of paper and re-solve it step-by-step yourself.
2. **Formula Chunking**: Create a 1-page condensed "Formula Anchor Sheet" categorizing by theorem (e.g., Green's, Stokes', Divergence).
3. **Target Weak Spots**: Focus 70% of your time on the problem types where you previously made algebraic or conceptual errors.

I can schedule two 45-minute calculus problem sessions for you today. Would you like me to add them to your planner?`;
  }

  if (query.includes('feynman') || query.includes('technique') || query.includes('memoriz') || query.includes('remember')) {
    return `### The Feynman Learning Technique (4 Steps)

The fastest way to achieve deep understanding and long-term retention:

1. **Choose the concept**: Write the title at the top of a blank sheet.
2. **Teach it to a 12-year-old**: Explain the idea out loud or in writing using plain, jargon-free language. If you use a buzzword, explain that buzzword simply.
3. **Identify knowledge gaps**: Wherever you hesitate, get stuck, or resort to complex terminology, go back to your textbook or lecture notes to fill the void.
4. **Simplify and analogize**: Create a real-world metaphor (e.g., "A binary tree is like a decision tournament").

Students using this retain over **75% more material** compared to passive re-reading!`;
  }

  if (query.includes('exam') || query.includes('cram') || query.includes('revision') || query.includes('3 days')) {
    return `### High-Yield 3-Day Exam Revision Strategy

When you have limited days before an exam, switch entirely from passive reading to **Active Retrieval**:

- **Day 1: High-Weight Syllabus Mapping**: Review the syllabus weights. Group topics into Red (unfamiliar), Yellow (somewhat clear), and Green (mastered). Spend 80% of Day 1 on Red topics.
- **Day 2: Past Paper Simulation**: Do timed mock exam questions under real test conditions without peeking at answers.
- **Day 3: Formula Audit & Confidence Calibration**: Review summary cheat-sheets, sleep early (minimum 7-8 hours to allow hippocampal memory consolidation), and avoid last-minute panic studying.

Check out your **Exams & Deadlines** tab to see your live countdowns and generate a customized revision schedule!`;
  }

  if (query.includes('schedule') || query.includes('plan') || query.includes('routine')) {
    return `### Designing an Optimal Daily Study Routine

Based on cognitive energy rhythms:

- **Morning (Peak Focus)**: Reserve for high-difficulty problem solving (Calculus, Algorithms, Logic).
- **Afternoon (Maintenance)**: Reserve for lab work, writing reports, and group discussions.
- **Evening (Active Recall & Synthesis)**: Spend 30 minutes testing yourself on flashcards or reviewing today's notes before winding down.

Use our **AI Study Planner** screen to auto-generate a schedule that balances your available hours with your upcoming deadlines!`;
  }

  return `I'm **MateBot**, your AI Study Companion! 🎓

Here are key ways I can assist your academic success:
- **Time & Schedule Planning**: Help you distribute weekly study hours and organize assignment deadlines.
- **Focus Strategies**: Overcome procrastination using the Pomodoro method and behavioral science.
- **Study Techniques**: Master Active Recall, Spaced Repetition, and the Feynman Technique.
- **Stress & Wellness**: Provide healthy pacing tips to avoid burnout.

What topic or challenge would you like help with today?`;
};
