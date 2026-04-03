interface DashboardPageProps {
  stats: Stats | null;
  recentTasks: Task[];
  setActivePage: (page: Page) => void;
}

export function DashboardPage({ stats, recentTasks, setActivePage }: DashboardPageProps) {
  if (!stats) return null;

  const progress = stats.total > 0 ? Math.round((stats.completed / (stats.total || 1)) * 100) : 0;
  const isAllDone = stats.total > 0 && stats.total === stats.completed;

  return (
    <div className="animate-fade-in pl-2 pr-6">
      <div className="mb-12">
        <h1 className="text-[2.2rem] font-bold text-slate-800 dark:text-white tracking-tight mb-1">Welcome back, User</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Here's a summary of your tasks for today.</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 mb-10">
        {/* Hero Welcome Card */}
        <div className="flex-1 glass-card p-10 relative overflow-hidden group shadow-[0_20px_50px_-10px_rgba(20,184,166,0.15)] dark:shadow-none border-0">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 dark:from-teal-500/10 dark:to-emerald-500/10 rounded-full blur-3xl group-hover:bg-teal-400/30 transition-colors" />
          
          <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
            <div className="flex-1 text-center md:text-left text-slate-800 dark:text-white">
              <h2 className="text-[1.8rem] leading-tight font-bold mb-4 tracking-tight">
                {isAllDone 
                  ? "Awesome! Everything is done." 
                  : `You've completed ${stats.completed} out of ${stats.total} tasks.`}
              </h2>
              <div className="w-full bg-slate-200/50 dark:bg-white/10 rounded-full h-4 mb-3 overflow-hidden shadow-inner">
                <div 
                  className="bg-gradient-to-r from-teal-400 to-emerald-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(52,211,153,0.5)]" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-[15px] font-semibold text-slate-500 dark:text-slate-300">{progress}% Completed</p>
            </div>
            
            <div className="w-36 h-36 relative flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90 drop-shadow-xl">
                <circle cx="72" cy="72" r="60" fill="white" className="dark:fill-slate-800" />
                <circle cx="72" cy="72" r="60" fill="transparent" className="stroke-slate-100 dark:stroke-white/5" strokeWidth="14" />
                <circle 
                  cx="72" cy="72" r="60" fill="transparent" 
                  stroke="url(#gradient)" strokeWidth="14" 
                  strokeDasharray="377" 
                  strokeDashoffset={377 - (377 * progress) / 100} 
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-teal-500 to-emerald-600 dark:from-white dark:to-white/80 tracking-tight">{progress}%</div>
            </div>
          </div>
        </div>

        {/* Stats Grid Side */}
        <div className="w-full xl:w-80 grid grid-cols-2 gap-4">
          <div className="glass-card p-6 flex flex-col justify-center border-0 shadow-sm hover:shadow-md">
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total</p>
            <p className="text-4xl font-bold text-slate-800 dark:text-white tracking-tight">{stats.total}</p>
          </div>
          <div className="glass-card p-6 flex flex-col justify-center border-0 shadow-sm hover:shadow-md relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-500">
               <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
             </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Pending</p>
            <p className="text-4xl font-bold text-amber-500 dark:text-amber-400 tracking-tight relative z-10">{stats.pending}</p>
          </div>
          <div className="glass-card p-6 flex flex-col justify-center border-0 shadow-sm hover:shadow-md">
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">High Prio</p>
            <p className="text-4xl font-bold text-rose-500 dark:text-rose-400 tracking-tight">{stats.high}</p>
          </div>
          <div className="glass-card p-6 flex flex-col justify-center border-0 shadow-sm hover:shadow-md bg-gradient-to-br from-white to-teal-50/50 dark:from-slate-800 dark:to-slate-800/80">
            <p className="text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">Completed</p>
            <p className="text-4xl font-bold text-teal-600 dark:text-teal-400 tracking-tight">{stats.completed}</p>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="flex justify-between items-end mb-6 pl-2">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Recent Active Tasks</h3>
        <button 
          onClick={() => setActivePage('tasks')}
          className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 text-sm font-bold flex items-center gap-1.5 bg-white/50 dark:bg-black/10 px-4 py-2 rounded-full transition-colors"
        >
          View All Tasks
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {recentTasks.length === 0 ? (
          <div className="glass-panel rounded-3xl p-10 text-center bg-white/30 dark:bg-transparent border-dashed border-2 border-slate-300 dark:border-white/10">
            <p className="text-slate-500 dark:text-slate-400 mb-3 font-medium">No active tasks right now.</p>
            <button 
              onClick={() => setActivePage('tasks')}
              className="px-6 py-2.5 rounded-full bg-teal-500 text-white font-bold shadow-lg shadow-teal-500/30 hover:scale-105 transition-transform"
            >
              Add a new task
            </button>
          </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentTasks.map(task => (
              <div key={task.id} className="glass-card p-5 flex items-start gap-4 border-0 shadow-sm hover:shadow-md cursor-pointer" onClick={() => setActivePage('tasks')}>
                 <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                   <span className={`w-3 h-3 rounded-full ${task.priority === 'high' ? 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.5)]' : task.priority === 'medium' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'}`}/>
                 </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 dark:text-white truncate text-[15px] mb-1">{task.title}</p>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{task.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
