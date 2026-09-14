# 🎓 StudyMate AI

> **An AI-Powered Academic Assistant Built on Design Thinking**  
> Personalized study planning, intelligent task prioritization, stress-aware wellness recommendations, and Pomodoro focus tracking designed to help college students thrive without burnout.

---

## 💡 The Design Thinking Approach

Many college students struggle with managing study time, academic workloads, overlapping deadlines, procrastination, and exam anxiety. **StudyMate AI** was engineered through the 5 stages of the **Design Thinking** methodology:

1. **Empathize**: Addressed common student hurdles—procrastination, task intimidation, cognitive fatigue, and guilt when falling behind through an empathy-driven onboarding survey and daily mood check-ins.
2. **Define**: Defined the core need: an adaptive academic assistant that doesn't just display rigid calendars, but dynamically recalculates plans when life happens.
3. **Ideate**: Brainstormed AI-driven features:
   - **AI Study Planner**: Automatically generates realistic daily and weekly study schedules.
   - **AI Priority Matrix**: Calculates Urgency + Importance + Difficulty score (0–100) for all tasks.
   - **Stress-Aware Pacing**: Converts heavy problem sets into lighter review when students report high fatigue.
4. **Prototype**: Built a responsive web & mobile application featuring dual view modes (Full Web View & Mobile Phone Mockup).
5. **Test & Validate**: Tested with realistic student personas under simulated deadline spikes and exam countdown conditions.

---

## ✨ Main Features

- 📅 **AI Study Planner**: Enter subjects, topics, difficulty, and available hours; the AI dynamically generates daily and weekly study schedules with built-in rest buffers.
- 🔄 **AI Missed-Session Rescheduler**: Missed a planned session? One click reallocates pending topics gently across upcoming days without causing overwhelm.
- ✅ **Smart Task Manager**: Categorizes assignments, projects, exams, and personal tasks. Computes priority badges (**Critical**, **High**, **Medium**, **Low**) with celebratory confetti upon completion.
- ⏱️ **Pomodoro Focus Timer**: Customizable intervals (15m Sprint, 25m Standard, 50m Deep Work) with circular SVG progress gauge and **Web Audio API ambient soundscapes** (Rainfall, Lo-Fi Hum, White Noise).
- 🌿 **Mood & Stress Check-in**: 5 interactive mood states (*Happy, Normal, Tired, Stressed, Anxious*), stress slider (1–10), and personalized AI study adaptations.
- 🤖 **AI Study Chatbot ("MateBot")**: Conversational tutor providing actionable strategies for procrastination (5-Minute Rule), the Feynman Technique, and 3-day revision plans.
- 📊 **Progress Dashboard**: Visual weekly study hours bar charts (Mon–Sun), subject-wise mastery bars, focus session tallies, and 7-day habit streaks.
- ⏳ **Exam Countdown Clocks**: Real-time live countdown timers (Days : Hours : Mins : Secs) and interactive syllabus milestone checklists.
- 📱 **Dual Presentation Mode**: Seamlessly switch between a widescreen web dashboard and a realistic smartphone frame mockup.

---

## 🛡️ Educational Support Disclaimer

StudyMate AI is a productivity and educational support tool, not a medical or mental-health diagnosis system. All wellness suggestions are general study and lifestyle pacing tips.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vite.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Synthesis**: Web Audio API (zero external audio file dependencies)
- **Delight & Animations**: Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SURIYAKUMARE/StudyMate-AI.git
   cd StudyMate-AI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
studymate-ai/
├── src/
│   ├── components/
│   │   ├── common/             # Header, Navigation, DesignThinkingModal, NotificationDrawer, MobileFrame
│   │   └── screens/            # 12 Core application screens
│   │       ├── SplashScreen.tsx
│   │       ├── AuthScreen.tsx
│   │       ├── OnboardingScreen.tsx
│   │       ├── HomeScreen.tsx
│   │       ├── PlannerScreen.tsx
│   │       ├── TasksScreen.tsx
│   │       ├── TimerScreen.tsx
│   │       ├── MoodScreen.tsx
│   │       ├── ChatScreen.tsx
│   │       ├── ProgressScreen.tsx
│   │       ├── ExamsScreen.tsx
│   │       └── ProfileScreen.tsx
│   ├── context/
│   │   └── AppContext.tsx      # Central reactive state & LocalStorage sync
│   ├── data/
│   │   └── sampleData.ts       # Realistic college student demonstration data
│   ├── utils/
│   │   ├── aiEngine.ts         # AI scheduling, priority matrix, mood recommendations
│   │   └── soundEffects.ts     # Web Audio API synthesizer for focus soundscapes
│   ├── types/
│   │   └── index.ts            # Full TypeScript interfaces
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 📄 License

MIT License. Designed with empathy for student academic success.
