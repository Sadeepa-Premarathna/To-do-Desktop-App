const {
  contextBridge,
  ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
  "todoAPI",
  {

    getTasks: () =>
      ipcRenderer.invoke(
        "get-tasks"
      ),

    addTask: (
      title,
      description
    ) =>
      ipcRenderer.invoke(
        "add-task",
        title,
        description
      ),

    deleteTask: (id) =>
      ipcRenderer.invoke(
        "delete-task",
        id
      ),

  }
);