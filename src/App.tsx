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
  const [theme, setTheme] = useState<Theme>('dark');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

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

  useEffect(() => { loadData(); }, []);

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
    } catch {
      showToast("An error occurred", 'error');
    }
  };

  const handleToggleTask = async (id: number) => {
    try { await window.todoAPI.toggleComplete(id); loadData(); }
    catch { showToast("Error updating task", 'error'); }
  };

  const handleDeleteTask = async (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try { await window.todoAPI.deleteTask(id); showToast("Task deleted"); loadData(); }
    catch { showToast("Error deleting task", 'error'); }
  };

  const handleClearCompleted = async () => {
    if (!confirm("Delete all completed tasks? This cannot be undone.")) return;
    try { await window.todoAPI.clearCompleted(); showToast("Completed tasks cleared"); loadData(); }
    catch { showToast("Error clearing tasks", 'error'); }
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden ${theme === 'dark' ? 'dark' : ''}`}
         style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}>

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        stats={stats}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="flex-1 overflow-y-auto overflow-x-hidden relative" style={{ padding: '2rem 2.5rem' }}>
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
            onEditTask={(task) => { setEditingTask(task); setIsModalOpen(true); }}
            onDeleteTask={handleDeleteTask}
            onOpenNewModal={() => { setEditingTask(null); setIsModalOpen(true); }}
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
          <SettingsPage theme={theme} toggleTheme={toggleTheme} />
        )}
      </main>

      <TaskModal
        key={isModalOpen ? (editingTask?.id ?? 'new') : 'closed'}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingTask(null); }}
        onSave={handleSaveTask}
        task={editingTask}
      />

      {toast && (
        <div className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
          {toast.type === 'success' && (
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#6366f1', flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;