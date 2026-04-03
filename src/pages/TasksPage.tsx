import { useState } from 'react';
import { TaskCard } from '../components/TaskCard';

interface TasksPageProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  onOpenNewModal: () => void;
}

export function TasksPage({ tasks, onToggleTask, onEditTask, onDeleteTask, onOpenNewModal }: TasksPageProps) {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredTasks = tasks.filter(t => {
    if (filter !== 'all' && t.category !== filter) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && 
        !(t.description && t.description.toLowerCase().includes(search.toLowerCase()))) {
      return false;
    }
    return true;
  });

  const categories = ['all', 'Personal', 'Work', 'Health', 'Shopping', 'Education'];

  return (
    <div className="animate-fade-in flex flex-col h-full relative pl-2 pr-4">
      <div className="flex justify-between items-center mb-10 shrink-0">
        <div>
          <h1 className="text-[2.2rem] font-bold text-slate-800 dark:text-white tracking-tight mb-1">My Tasks</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage and organize your active tasks.</p>
        </div>
        
        <button 
          onClick={onOpenNewModal}
          className="bg-gradient-to-r from-teal-500 to-emerald-400 text-white px-6 py-3 rounded-full font-bold shadow-[0_10px_25px_rgba(20,184,166,0.3)] flex items-center gap-2.5 transition-all hover:scale-[1.03] active:scale-[0.97]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
           Add Task
        </button>
      </div>

      {/* Header tools */}
      <div className="flex flex-col md:flex-row gap-5 mb-8 shrink-0">
        <div className="relative flex-[1.5]">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="glass-input w-full pl-12 pr-5 py-3.5 rounded-full placeholder-slate-400 font-medium text-[15px] border-0 shadow-sm"
            placeholder="Search your tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex-1 flex overflow-x-auto gap-3 pb-2 snap-x hide-scrollbar items-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full whitespace-nowrap text-[13px] font-bold uppercase tracking-wider transition-all snap-start ${
                filter === cat 
                  ? 'bg-slate-800 text-white shadow-lg dark:bg-teal-500 shadow-slate-800/20 dark:shadow-teal-500/20' 
                  : 'bg-white/60 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-white/10 shadow-sm hover:shadow-md'
              }`}
            >
              {cat === 'all' ? 'All Areas' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto pr-4 pb-24 space-y-4 custom-scrollbar">
        {filteredTasks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-500 dark:text-slate-400 animate-scale-in">
            <div className="w-20 h-20 mb-6 rounded-full bg-white dark:bg-white/5 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <svg className="w-10 h-10 text-teal-400 dark:text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <p className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">No tasks found</p>
            <p className="text-[15px] mt-2 font-medium">{search || filter !== 'all' ? "Try adjusting your filters to find what you're looking for." : "You're all caught up! Enjoy your free time."}</p>
            {!(search || filter !== 'all') && (
              <button 
                onClick={onOpenNewModal}
                className="mt-6 text-teal-500 font-bold hover:text-teal-600 transition-colors uppercase tracking-wider text-sm flex items-center gap-2 bg-white/50 dark:bg-white/5 px-6 py-3 rounded-full"
              >
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                Create a task
              </button>
            )}
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onToggle={onToggleTask}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
