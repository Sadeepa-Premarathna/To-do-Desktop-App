const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("todoAPI", {
  getTasks: () => ipcRenderer.invoke("get-tasks"),
  getCompletedTasks: () => ipcRenderer.invoke("get-completed-tasks"),
  getStats: () => ipcRenderer.invoke("get-stats"),
  
  addTask: (title, description, priority, category, due_date) => 
    ipcRenderer.invoke("add-task", title, description, priority, category, due_date),
    
  updateTask: (id, title, description, priority, category, due_date) =>
    ipcRenderer.invoke("update-task", id, title, description, priority, category, due_date),
    
  toggleComplete: (id) => ipcRenderer.invoke("toggle-complete", id),
  deleteTask: (id) => ipcRenderer.invoke("delete-task", id),
  clearCompleted: () => ipcRenderer.invoke("clear-completed")
});