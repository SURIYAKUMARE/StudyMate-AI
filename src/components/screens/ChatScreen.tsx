import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getAIChatResponse } from '../../utils/aiEngine';
import {
  MessageSquareText,
  Send,
  Sparkles,
  Bot,
  User,
  Clock,
  Flame,
  Calendar,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const ChatScreen: React.FC = () => {
  const { profile, setCurrentScreen } = useApp();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello ${profile.name}! 👋 I am **MateBot**, your AI Study Companion.

I'm engineered around **Design Thinking** principles to help you tackle college hurdles:
- Overcoming **procrastination** and task paralysis
- Active recall & **Feynman study techniques**
- Building realistic **daily & weekly revision timetables**
- Managing cognitive stress and exam pressure

What study topic or challenge can we solve right now?`,
      timestamp: 'Just now'
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "I'm procrastinating on my calculus homework. Help me start!",
    'How do I use the Feynman Technique for difficult concepts?',
    "I have an exam in 3 days. What's the best revision timetable?",
    'How should I structure my daily study schedule?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI cognitive reflection
    setTimeout(() => {
      const reply = getAIChatResponse(query);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden animate-fade-in">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50 via-purple-50 to-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-slate-900 text-sm">MateBot AI Study Companion</h2>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-500">
              Personalized academic coaching • Spaced Repetition • Procrastination Slayer
            </p>
          </div>
        </div>

        {/* Quick action jump */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => setCurrentScreen('timer')}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition flex items-center gap-1.5 shadow-2xs"
          >
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            <span>Launch Pomodoro</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map(msg => {
          const isAi = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  isAi
                    ? 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-sm whitespace-pre-line'
                    : 'bg-indigo-600 text-white rounded-tr-sm'
                }`}
              >
                {msg.text}
                <div
                  className={`text-[10px] mt-1.5 font-medium ${
                    isAi ? 'text-slate-400' : 'text-indigo-200 text-right'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {!isAi && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs p-2">
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
            <span className="text-[11px] font-medium ml-1">MateBot is generating study strategy...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0">Try asking:</span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:border-indigo-400 hover:text-indigo-600 whitespace-nowrap transition shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask MateBot about study planning, productivity, or revision techniques..."
          className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-3 rounded-2xl gradient-brand text-white shadow-md shadow-indigo-500/20 hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 transition shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
