const {
  app,
  BrowserWindow,
  ipcMain
} = require("electron");

const path = require("path");

const {
  getTasks,
  addTask,
  deleteTask
} = require("../database/db");

function createWindow() {

  const win =
    new BrowserWindow({

      width: 1100,
      height: 750,

      webPreferences: {
        preload: path.join(
          __dirname,
          "preload.js"
        ),
      },

    });

  win.loadURL(
    "http://localhost:5173"
  );
}

app.whenReady().then(() => {

  createWindow();

  ipcMain.handle(
    "get-tasks",
    () => getTasks()
  );

  ipcMain.handle(
    "add-task",
    (_, title, description) =>
      addTask(title, description)
  );

  ipcMain.handle(
    "delete-task",
    (_, id) =>
      deleteTask(id)
  );

});