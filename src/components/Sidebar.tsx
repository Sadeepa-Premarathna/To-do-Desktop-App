


interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  stats: Stats | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Sidebar({ activePage, setActivePage, stats, theme, toggleTheme }: SidebarProps) {
  const navItems: { id: Page; label: string; icon: string; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { id: 'tasks', label: 'My Tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', badge: stats?.pending },
    { id: 'completed', label: 'Completed', icon: 'M5 13l4 4L19 7', badge: stats?.completed },
    { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  return (
    <div className="w-64 glass-panel h-screen border-r-0 flex flex-col pt-10 pb-6 relative z-10 animate-slide-in transition-colors rounded-r-[2.5rem] shadow-[10px_0_40px_rgba(0,0,0,0.03)] dark:shadow-none">
      {/* Logo */}
      <div className="px-8 mb-12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
          ZenTask
        </h1>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item, i) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center justify-between px-5 py-3.5 rounded-full transition-all duration-300 animate-slide-in stagger-${i+1} ${
                isActive 
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-400 text-white shadow-[0_8px_20px_rgba(20,184,166,0.3)] transform scale-[1.02]' 
                  : 'hover:bg-slate-100/50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} fill={isActive ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? 0 : 2} d={item.icon} />
                </svg>
                <span className={`font-semibold text-[15px] ${isActive ? 'text-white' : ''}`}>
                  {item.label}
                </span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-teal-50 dark:bg-white/10 text-teal-600 dark:text-slate-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      
      {/* Footer Info & Theme Toggle */}
      <div className="px-6 mt-auto flex flex-col gap-4">
        <button 
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-5 py-3.5 rounded-full bg-slate-100/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 shadow-sm transition-all text-slate-600 dark:text-slate-300 text-sm font-semibold hover:shadow-md"
        >
          {theme === 'dark' ? (
            <><span className="flex items-center gap-3"><svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg> Light Mode</span></>
          ) : (
            <><span className="flex items-center gap-3"><svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg> Dark Mode</span></>
          )}
        </button>
      </div>
    </div>
  );
}
