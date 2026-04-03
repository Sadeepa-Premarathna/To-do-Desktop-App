import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TaskModal } from "./components/TaskModal";
import { DashboardPage } from "./pages/DashboardPage";
import { TasksPage } from "./pages/TasksPage";
import { CompletedPage } from "./pages/CompletedPage";
import { SettingsPage } from "./pages/SettingsPage";
import "./index.css";

export type Theme = 'light' | 'dark';

function App() {
  const [activePage, setActivePage] = useState<Page>('dashboard');
  
  // Theme Management
  const [theme, setTheme] = useState<Theme>('dark');
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme to body
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    try {
      const [_tasks, _completed, _stats] = await Promise.all([
        window.todoAPI.getTasks(),
        window.todoAPI.getCompletedTasks(),
        window.todoAPI.getStats()
      ]);
      setTasks(_tasks);
      setCompletedTasks(_completed);
      setStats(_stats);
    } catch (e) {
      console.error("Error loading data", e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveTask = async (taskData: any) => {
    try {
      if (taskData.id) {
        await window.todoAPI.updateTask(
          taskData.id, taskData.title, taskData.description, 
          taskData.priority, taskData.category, taskData.due_date
        );
        showToast("Task updated successfully");
      } else {
        await window.todoAPI.addTask(
          taskData.title, taskData.description, 
          taskData.priority, taskData.category, taskData.due_date
        );
        showToast("Task created successfully");
        if (activePage === 'dashboard') setActivePage('tasks');
      }
      setIsModalOpen(false);
      setEditingTask(null);
      loadData();
    } catch (err) {
      showToast("An error occurred", 'error');
    }
  };

  const handleToggleTask = async (id: number) => {
    try {
      await window.todoAPI.toggleComplete(id);
      loadData();
    } catch (err) {
      showToast("Error updating task", 'error');
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await window.todoAPI.deleteTask(id);
      showToast("Task deleted");
      loadData();
    } catch (err) {
      showToast("Error deleting task", 'error');
    }
  };

  const handleClearCompleted = async () => {
    if (!confirm("Delete all completed tasks? This cannot be undone.")) return;
    try {
      await window.todoAPI.clearCompleted();
      showToast("Completed tasks cleared");
      loadData();
    } catch (err) {
      showToast("Error clearing tasks", 'error');
    }
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openNewModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  return (
    <div className={`flex h-screen w-full transition-colors duration-500 overflow-hidden relative ${theme === 'dark' ? 'dark text-slate-200' : 'text-slate-800'}`}>
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        stats={stats} 
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="flex-1 overflow-x-hidden relative z-10 p-8 h-full">
        {activePage === 'dashboard' && (
          <DashboardPage 
            stats={stats} 
            recentTasks={tasks.slice(0, 3)} 
            setActivePage={setActivePage} 
          />
        )}
        
        {activePage === 'tasks' && (
          <TasksPage 
            tasks={tasks} 
            onToggleTask={handleToggleTask}
            onEditTask={openEditModal}
            onDeleteTask={handleDeleteTask}
            onOpenNewModal={openNewModal}
          />
        )}
        
        {activePage === 'completed' && (
          <CompletedPage 
            tasks={completedTasks} 
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onClearAll={handleClearCompleted}
          />
        )}
        
        {activePage === 'settings' && (
          <SettingsPage 
            theme={theme}
            toggleTheme={toggleTheme}
          />
        )}
      </main>

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingTask(null); }}
        onSave={handleSaveTask}
        task={editingTask}
      />

      {/* Toast Integration */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-slide-in ${
          toast.type === 'error' 
            ? 'bg-rose-500/90 text-white backdrop-blur-md' 
            : 'bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white backdrop-blur-md border border-slate-200 dark:border-white/10'
        }`}>
          {toast.type === 'success' && (
            <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;