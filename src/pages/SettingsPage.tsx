import type { Theme } from '../App';

interface SettingsPageProps {
  theme: Theme;
  toggleTheme: () => void;
}

export function SettingsPage({ theme, toggleTheme }: SettingsPageProps) {
  return (
    <div className="animate-fade-in max-w-3xl pl-2 pr-6">
      <div className="mb-12">
        <h1 className="text-[2.2rem] font-bold text-slate-800 dark:text-white tracking-tight mb-1">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your ZenTask application preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Appearance Settings */}
        <div className="glass-card p-8 border-0 shadow-sm hover:shadow-md">
          <h2 className="text-[19px] font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            Design & Appearance
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-bold text-slate-800 dark:text-white text-[15px]">Application Theme</p>
                <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">Switch between light and dark backgrounds.</p>
              </div>
              <button 
                onClick={toggleTheme}
                className="px-6 py-2.5 rounded-full bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 font-bold shadow-sm hover:shadow-md border border-slate-100 dark:border-white/5 transition-all text-sm"
               >
                Use {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </button>
            </div>
          </div>
        </div>

        {/* About App */}
        <div className="glass-card p-8 border-0 shadow-sm hover:shadow-md">
          <h2 className="text-[19px] font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            About Application
          </h2>
          <div className="space-y-3 text-[14px] font-medium text-slate-600 dark:text-slate-300">
            <div className="flex justify-between py-3 border-b border-black-[0.03] dark:border-white/5">
              <span>Version</span>
              <span className="font-bold text-slate-900 dark:text-white">v1.2 (Soft Glassmorphism Theme)</span>
            </div>
            <div className="flex justify-between py-3 border-b border-black-[0.03] dark:border-white/5">
              <span>Framework</span>
              <span className="font-bold text-slate-900 dark:text-white">Electron + React + Vite</span>
            </div>
            <div className="flex justify-between py-3 border-b border-black-[0.03] dark:border-white/5">
              <span>Database</span>
              <span className="font-bold text-slate-900 dark:text-white">Better-SQLite3</span>
            </div>
            <div className="flex justify-between py-3 border-b border-black-[0.03] dark:border-white/5">
              <span>Design System</span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">CoachPro Inspired</span>
            </div>
            <div className="flex justify-between py-3">
              <span>Developer</span>
              <span className="font-bold text-slate-900 dark:text-white">Zenologic</span>
            </div>
          </div>
        </div>

        {/* Danger */}
        <div className="glass-card p-8 border-0 shadow-sm hover:shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rotate-45 transform translate-x-10 -translate-y-10" />
          <h2 className="text-[19px] font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            Danger Zone
          </h2>
          <div className="space-y-4 relative z-10">
            <p className="text-[14px] font-medium text-slate-500 dark:text-slate-400">These actions are permanent and cannot be undone.</p>
            <button className="w-full text-left px-5 py-3.5 bg-white dark:bg-rose-500/5 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-500 border border-rose-100 dark:border-rose-500/20 rounded-2xl transition-colors font-bold opacity-50 cursor-not-allowed shadow-sm">
              Clear All Data (Factory Reset)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
