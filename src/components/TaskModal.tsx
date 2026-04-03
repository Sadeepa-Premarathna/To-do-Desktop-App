import { useState, useEffect } from 'react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: any) => void;
  task?: Task | null;
}

export function TaskModal({ isOpen, onClose, onSave, task }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority);
      setCategory(task.category);
      setDueDate(task.due_date || '');
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('Personal');
      setDueDate('');
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSave({
      id: task?.id,
      title,
      description,
      priority,
      category,
      due_date: dueDate || null
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-black/60 backdrop-blur-md animate-fade-in">
      <div 
        className="glass-panel w-full max-w-[500px] border-0 rounded-[2rem] p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] animate-scale-in bg-white/90 dark:bg-slate-800/90"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
            {task ? 'Edit Task' : 'New Task'}
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 p-2.5 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[13px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Task Title <span className="text-rose-400">*</span></label>
            <input
              autoFocus
              className="glass-input w-full rounded-2xl px-5 py-4 placeholder-slate-400/70 border-0 shadow-sm text-[15px] font-medium"
              placeholder="What do you need to get done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-[13px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Description</label>
            <textarea
              className="glass-input w-full rounded-2xl px-5 py-4 h-28 resize-none placeholder-slate-400/70 border-0 shadow-sm text-[15px]"
              placeholder="Add some details... (optional)"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-[13px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Priority</label>
              <select
                className="glass-input w-full rounded-2xl px-4 py-3.5 text-[14px] font-semibold appearance-none bg-transparent border-0 shadow-sm"
                value={priority}
                onChange={e => setPriority(e.target.value as Priority)}
              >
                <option value="low" className="text-slate-800 dark:text-white dark:bg-slate-800">Low Priority</option>
                <option value="medium" className="text-slate-800 dark:text-white dark:bg-slate-800">Medium Priority</option>
                <option value="high" className="text-slate-800 dark:text-white dark:bg-slate-800">High Priority</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[13px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Category</label>
              <select
                className="glass-input w-full rounded-2xl px-4 py-3.5 text-[14px] font-semibold appearance-none bg-transparent border-0 shadow-sm"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="Personal" className="text-slate-800 dark:text-white dark:bg-slate-800">Personal</option>
                <option value="Work" className="text-slate-800 dark:text-white dark:bg-slate-800">Work</option>
                <option value="Health" className="text-slate-800 dark:text-white dark:bg-slate-800">Health</option>
                <option value="Shopping" className="text-slate-800 dark:text-white dark:bg-slate-800">Shopping</option>
                <option value="Education" className="text-slate-800 dark:text-white dark:bg-slate-800">Education</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Due Date</label>
            <input
              type="date"
              className="glass-input w-full rounded-2xl px-5 py-3.5 text-[14px] font-semibold border-0 shadow-sm style-color-scheme-dark dark:style-color-scheme-dark"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />
          </div>

          <div className="mt-10 pt-2 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-4 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-600 dark:text-white font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-[2] px-5 py-4 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 disabled:opacity-50 text-white font-bold shadow-[0_10px_20px_rgba(20,184,166,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {task ? 'Update Task' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
