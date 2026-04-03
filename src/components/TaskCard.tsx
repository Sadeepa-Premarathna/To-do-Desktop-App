

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  const isHighPriority = task.priority === 'high';
  const isMediumPriority = task.priority === 'medium';
  
  // Adjusted priorities logic for soft theme
  const priorityColor = isHighPriority 
    ? 'bg-rose-400 shadow-[0_0_15px_rgba(251,113,133,0.5)]' 
    : isMediumPriority 
      ? 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]' 
      : 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]';

  const priorityTextColor = isHighPriority ? 'text-rose-600 dark:text-rose-400' : isMediumPriority ? 'text-amber-600 dark:text-amber-400' : 'text-teal-600 dark:text-teal-400';
  const priorityBgColor = isHighPriority ? 'bg-rose-50 border-rose-100 dark:bg-rose-500/10 dark:border-rose-500/20' 
                        : isMediumPriority ? 'bg-amber-50 border-amber-100 dark:bg-amber-400/10 dark:border-amber-400/20' 
                        : 'bg-teal-50 border-teal-100 dark:bg-teal-400/10 dark:border-teal-400/20';

  const isCompleted = task.completed === 1;

  return (
    <div className={`glass-card p-6 relative overflow-visible group animate-scale-in transition-all ${isCompleted ? 'opacity-60 grayscale hover:grayscale-0' : ''}`}>
      {/* Soft rounded priority indicator */}
      <div className={`absolute -left-1.5 top-6 bottom-6 w-3 rounded-full ${priorityColor} opacity-80`} />
      
      <div className="flex gap-5 items-start pl-3">
        <div className="pt-0.5">
          <input 
            type="checkbox" 
            className="custom-checkbox"
            checked={isCompleted}
            onChange={() => onToggle(task.id)}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className={`font-semibold text-[17px] truncate transition-colors ${isCompleted ? 'line-through text-slate-400' : 'text-slate-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400'}`}>
              {task.title}
            </h3>
          </div>
          
          {task.description && (
            <p className={`text-[13px] mb-4 line-clamp-2 font-medium ${isCompleted ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
              {task.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-semibold tracking-wide uppercase">
            <span className={`px-3 py-1.5 rounded-full border ${priorityBgColor} ${priorityTextColor}`}>
              {task.priority}
            </span>
            
            <span className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {task.category}
            </span>
            
            {(task.due_date || task.timestamp) && (
              <span className="px-3 py-1.5 rounded-full border border-teal-200 dark:border-teal-500/20 bg-teal-50/50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 flex items-center gap-1.5 ml-auto">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {task.due_date ? new Date(task.due_date).toLocaleDateString() : task.timestamp}
              </span>
            )}
          </div>
        </div>

        {/* Hover Actions */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2 bg-white/40 dark:bg-black/20 p-1.5 rounded-2xl backdrop-blur-sm border border-white/50 dark:border-white/10 shadow-sm">
          <button 
            onClick={() => onEdit(task)}
            className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-white/10 hover:text-teal-600 dark:hover:text-teal-400 text-slate-400 transition-all shadow-sm hover:shadow-md"
            title="Edit Task"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-white/10 hover:text-rose-500 text-slate-400 transition-all shadow-sm hover:shadow-md"
            title="Delete Task"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
