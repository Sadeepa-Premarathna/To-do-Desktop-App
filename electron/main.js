const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const {
  getTasks,
  getCompletedTasks,
  getStats,
  addTask,
  updateTask,
  toggleComplete,
  deleteTask,
  clearCompleted
} = require("../database/db");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#0f172a',
      symbolColor: '#f8fafc'
    }
  });

  win.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle("get-tasks", () => getTasks());
  ipcMain.handle("get-completed-tasks", () => getCompletedTasks());
  ipcMain.handle("get-stats", () => getStats());
  
  ipcMain.handle("add-task", (_, title, description, priority, category, due_date) => 
    addTask(title, description, priority, category, due_date)
  );
  
  ipcMain.handle("update-task", (_, id, title, description, priority, category, due_date) => 
    updateTask(id, title, description, priority, category, due_date)
  );

  ipcMain.handle("toggle-complete", (_, id) => toggleComplete(id));
  ipcMain.handle("delete-task", (_, id) => deleteTask(id));
  ipcMain.handle("clear-completed", () => clearCompleted());
});