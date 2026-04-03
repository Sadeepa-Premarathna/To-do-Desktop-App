
import { TaskCard } from '../components/TaskCard';

interface CompletedPageProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onClearAll: () => void;
}

export function CompletedPage({ tasks, onToggleTask, onDeleteTask, onClearAll }: CompletedPageProps) {
  return (
    <div className="animate-fade-in flex flex-col h-full relative pl-2 pr-4">
      <div className="flex justify-between items-center mb-10 shrink-0">
        <div>
          <h1 className="text-[2.2rem] font-bold text-slate-800 dark:text-white tracking-tight mb-1">Completed</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Everything you've accomplished.</p>
        </div>
        
        {tasks.length > 0 && (
          <button 
            onClick={onClearAll}
            className="bg-white/50 hover:bg-white dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-500 border border-transparent hover:border-rose-200 dark:hover:border-rose-500/30 px-5 py-2.5 rounded-full text-[14px] font-bold transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear History
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-4 pb-24 space-y-4 custom-scrollbar">
        {tasks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-500 dark:text-slate-400 animate-scale-in">
            <div className="w-20 h-20 mb-6 rounded-full bg-white dark:bg-white/5 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <svg className="w-10 h-10 text-emerald-400 dark:text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">No completed tasks yet</p>
            <p className="text-[15px] mt-2 font-medium">Check off tasks to see them appear here.</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onToggle={onToggleTask}
              onEdit={() => {}} // Disabled for completed
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
