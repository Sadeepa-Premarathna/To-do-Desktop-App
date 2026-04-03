const Database = require("better-sqlite3");

const db = new Database("tasks.db");


db.prepare(`
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  timestamp TEXT NOT NULL
)
`).run();


function getTasks() {
  return db.prepare(
    "SELECT * FROM tasks ORDER BY id DESC"
  ).all();
}


function addTask(title, description) {

  const timestamp =
    new Date().toLocaleString();

  db.prepare(`
    INSERT INTO tasks
    (title, description, timestamp)
    VALUES (?, ?, ?)
  `).run(
    title,
    description,
    timestamp
  );

  return getTasks();
}


function deleteTask(id) {

  db.prepare(
    "DELETE FROM tasks WHERE id=?"
  ).run(id);

  return getTasks();
}

module.exports = {
  getTasks,
  addTask,
  deleteTask
};