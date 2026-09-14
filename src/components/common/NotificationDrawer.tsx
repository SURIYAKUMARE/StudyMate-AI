import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  X,
  CheckCheck,
  Calendar,
  AlertCircle,
  Flame,
  Coffee,
  HeartPulse
} from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const {
    notifications,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    markNotificationRead,
    clearAllNotifications,
    setCurrentScreen
  } = useApp();

  if (!isNotificationDrawerOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <AlertCircle className="w-4 h-4 text-rose-500" />;
      case 'deadline':
        return <Calendar className="w-4 h-4 text-amber-500" />;
      case 'session':
        return <Flame className="w-4 h-4 text-orange-500" />;
      case 'break':
        return <Coffee className="w-4 h-4 text-sky-500" />;
      case 'wellness':
        return <HeartPulse className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900">Notifications & Reminders</h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={clearAllNotifications}
              className="p-1.5 text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition"
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsNotificationDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No notifications right now! You're all caught up.
            </div>
          ) : (
            notifications.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  markNotificationRead(item.id);
                  if (item.targetScreen) {
                    setCurrentScreen(item.targetScreen);
                    setIsNotificationDrawerOpen(false);
                  }
                }}
                className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                  item.isRead
                    ? 'bg-white border-slate-100 opacity-75'
                    : 'bg-indigo-50/40 border-indigo-100 shadow-sm hover:border-indigo-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white border border-slate-100 shadow-xs shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                  {!item.isRead && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-1" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-center text-xs text-slate-400">
          Smart AI alerts update according to your study routine.
        </div>
      </div>
    </div>
  );
};
