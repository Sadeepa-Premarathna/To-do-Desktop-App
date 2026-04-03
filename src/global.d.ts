export {};

declare global {
  type Priority = 'low' | 'medium' | 'high';
  type Page = 'dashboard' | 'tasks' | 'completed' | 'settings';
  
  interface Task {
    id: number;
    title: string;
    description: string;
    timestamp: string;
    completed: number;
    priority: Priority;
    category: string;
    due_date: string | null;
  }

  interface Stats {
    total: number;
    completed: number;
    pending: number;
    high: number;
  }

  interface Window {
    todoAPI: {
      getTasks: () => Promise<Task[]>;
      getCompletedTasks: () => Promise<Task[]>;
      getStats: () => Promise<Stats>;
      
      addTask: (
        title: string,
        description: string,
        priority: string,
        category: string,
        due_date: string | null
      ) => Promise<Task[]>;
      
      updateTask: (
        id: number,
        title: string,
        description: string,
        priority: string,
        category: string,
        due_date: string | null
      ) => Promise<Task[]>;
      
      toggleComplete: (id: number) => Promise<Task[]>;
      deleteTask: (id: number) => Promise<Task[]>;
      clearCompleted: () => Promise<Stats>;
    };
  }
}