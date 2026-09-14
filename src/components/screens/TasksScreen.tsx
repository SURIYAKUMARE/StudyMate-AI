import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Task, TaskCategory, TaskDifficulty, TaskImportance } from '../../types';
import {
  CheckSquare,
  Plus,
  Filter,
  ArrowUpDown,
  Sparkles,
  Calendar,
  Clock,
  Trash2,
  CheckCircle2,
  Circle,
  Tag,
  BookOpen,
  X,
  AlertCircle
} from 'lucide-react';

export const TasksScreen: React.FC = () => {
  const { tasks, addTask, toggleTaskComplete, deleteTask, subjects } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<'all' | TaskCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'pending' | 'completed' | 'all'>('pending');
  const [sortBy, setSortBy] = useState<'priority' | 'deadline' | 'hours'>('priority');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New task form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('assignment');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [estimatedHours, setEstimatedHours] = useState(2);
  const [difficulty, setDifficulty] = useState<TaskDifficulty>('medium');
  const [importance, setImportance] = useState<TaskImportance>('medium');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const matchedSubject = subjects.find(s => s.id === subjectId);

    addTask({
      title,
      description,
      category,
      subjectId,
      subjectName: matchedSubject ? matchedSubject.name : 'General',
      dueDate: new Date(dueDate).toISOString(),
      estimatedHours,
      difficulty,
      importance
    });

    setTitle('');
    setDescription('');
    setIsAddModalOpen(false);
  };

  // Filter & Sort
  const filteredTasks = tasks
    .filter(t => {
      if (categoryFilter !== 'all' && t.category !== categoryFilter) return false;
      if (statusFilter === 'pending' && t.isCompleted) return false;
      if (statusFilter === 'completed' && !t.isCompleted) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') return b.aiPriorityScore - a.aiPriorityScore;
      if (sortBy === 'deadline') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      return b.estimatedHours - a.estimatedHours;
    });

  const getPriorityBadgeStyle = (label: string) => {
    switch (label) {
      case 'Critical':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'High':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Medium':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Design Thinking: AI Prioritization</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Smart Task Manager</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Tasks are dynamically evaluated on deadline proximity, difficulty, and academic weight.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md shadow-indigo-500/25 hover:brightness-110 flex items-center justify-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Academic Task</span>
        </button>
      </div>

      {/* Control Bar: Category Filters & Sort */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {(['all', 'assignment', 'project', 'exam', 'personal'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort & Status Selectors */}
        <div className="flex items-center gap-2 ml-auto">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="pending">Pending Only</option>
            <option value="completed">Completed</option>
            <option value="all">All Status</option>
          </select>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="priority">Sort: AI Priority Score</option>
            <option value="deadline">Sort: Due Date</option>
            <option value="hours">Sort: Estimated Hours</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
            <CheckSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500 font-medium">No tasks found matching your filters.</p>
          </div>
        ) : (
          filteredTasks.map(task => {
            const dueDays = Math.ceil(
              (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );
            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  task.isCompleted
                    ? 'bg-slate-50/70 border-slate-200 opacity-70'
                    : 'bg-white border-slate-200/90 shadow-xs hover:border-indigo-300 hover:shadow-soft'
                }`}
              >
                {/* Left: Checkbox & Info */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <button
                    onClick={() => toggleTaskComplete(task.id)}
                    className="mt-0.5 text-slate-300 hover:text-indigo-600 transition shrink-0"
                  >
                    {task.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 hover:text-indigo-500" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${getPriorityBadgeStyle(
                          task.aiPriorityLabel
                        )}`}
                      >
                        AI Priority: {task.aiPriorityLabel} ({task.aiPriorityScore}/100)
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase">
                        {task.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {task.subjectName}
                      </span>
                    </div>

                    <h3
                      className={`text-sm font-bold truncate ${
                        task.isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                      {task.description}
                    </p>
                  </div>
                </div>

                {/* Right: Meta Badges & Delete */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        dueDays <= 2 ? 'text-rose-600 font-bold' : 'text-slate-500'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{dueDays > 0 ? `${dueDays}d left` : 'Due today'}</span>
                    </span>

                    <span className="text-slate-400">•</span>

                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{task.estimatedHours}h</span>
                    </span>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-slate-900 text-base">Add New Academic Task</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Implement Dijkstra Algorithm in C++"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Detail requirements, specific chapters or deliverables..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={subjectId}
                    onChange={e => setSubjectId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as TaskCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs capitalize"
                  >
                    <option value="assignment">Assignment</option>
                    <option value="project">Project</option>
                    <option value="exam">Exam Prep</option>
                    <option value="personal">Personal / Co-op</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Hours</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={estimatedHours}
                    onChange={e => setEstimatedHours(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value as TaskDifficulty)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs capitalize"
                  >
                    <option value="easy">Easy (Low Mental Effort)</option>
                    <option value="medium">Medium (Standard)</option>
                    <option value="hard">Hard (High Mental Effort)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Importance</label>
                  <select
                    value={importance}
                    onChange={e => setImportance(e.target.value as TaskImportance)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs capitalize"
                  >
                    <option value="low">Low (Minor Impact)</option>
                    <option value="medium">Medium (Standard Grade)</option>
                    <option value="high">High (Major % of Grade)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 font-semibold text-xs hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:brightness-110 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Compute AI Priority & Add</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
