const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "..", "tasks.db"));

// Create table
db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    timestamp TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    priority TEXT DEFAULT 'medium',
    category TEXT DEFAULT 'Personal',
    due_date TEXT DEFAULT NULL
  )
`).run();

// Migrate existing DB: add missing columns
const cols = db.prepare("PRAGMA table_info(tasks)").all().map(c => c.name);
if (!cols.includes("completed"))  db.prepare("ALTER TABLE tasks ADD COLUMN completed INTEGER DEFAULT 0").run();
if (!cols.includes("priority"))   db.prepare("ALTER TABLE tasks ADD COLUMN priority TEXT DEFAULT 'medium'").run();
if (!cols.includes("category"))   db.prepare("ALTER TABLE tasks ADD COLUMN category TEXT DEFAULT 'Personal'").run();
if (!cols.includes("due_date"))   db.prepare("ALTER TABLE tasks ADD COLUMN due_date TEXT DEFAULT NULL").run();

function getTasks() {
  return db.prepare("SELECT * FROM tasks WHERE completed = 0 ORDER BY id DESC").all();
}

function getCompletedTasks() {
  return db.prepare("SELECT * FROM tasks WHERE completed = 1 ORDER BY id DESC").all();
}

function getStats() {
  const total     = db.prepare("SELECT COUNT(*) as c FROM tasks").get().c;
  const completed = db.prepare("SELECT COUNT(*) as c FROM tasks WHERE completed = 1").get().c;
  const high      = db.prepare("SELECT COUNT(*) as c FROM tasks WHERE priority = 'high' AND completed = 0").get().c;
  return { total, completed, pending: total - completed, high };
}

function addTask(title, description, priority, category, due_date) {
  const timestamp = new Date().toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
  db.prepare(`
    INSERT INTO tasks (title, description, timestamp, completed, priority, category, due_date)
    VALUES (?, ?, ?, 0, ?, ?, ?)
  `).run(title, description || "", timestamp, priority || "medium", category || "Personal", due_date || null);
  return getTasks();
}

function updateTask(id, title, description, priority, category, due_date) {
  db.prepare(`
    UPDATE tasks SET title=?, description=?, priority=?, category=?, due_date=? WHERE id=?
  `).run(title, description || "", priority, category, due_date || null, id);
  return getTasks();
}

function toggleComplete(id) {
  const task = db.prepare("SELECT completed FROM tasks WHERE id=?").get(id);
  if (!task) return getTasks();
  db.prepare("UPDATE tasks SET completed=? WHERE id=?").run(task.completed ? 0 : 1, id);
  return getTasks();
}

function deleteTask(id) {
  db.prepare("DELETE FROM tasks WHERE id=?").run(id);
  return getTasks();
}

function clearCompleted() {
  db.prepare("DELETE FROM tasks WHERE completed=1").run();
  return getStats();
}

module.exports = { getTasks, getCompletedTasks, getStats, addTask, updateTask, toggleComplete, deleteTask, clearCompleted };