import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  timestamp: string;
};

function App() {

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks =
    async () => {

      const data =
        await window.todoAPI
          .getTasks();

      setTasks(data);
    };

  const handleAdd =
    async () => {

      if (!title.trim()) {
        alert("Title required");
        return;
      }

      const data =
        await window.todoAPI
          .addTask(
            title,
            description
          );

      setTasks(data);

      setTitle("");
      setDescription("");
    };

  const handleDelete =
    async (id: number) => {

      const data =
        await window.todoAPI
          .deleteTask(id);

      setTasks(data);
    };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        To-Do Manager
      </h1>

      <div className="bg-white p-4 rounded shadow mb-6">

        <input
          className="w-full border p-2 mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          className="w-full border p-2 mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>

      </div>

      {tasks.map(task => (

        <div
          key={task.id}
          className="bg-white p-4 rounded shadow mb-4"
        >

          <h2 className="font-bold">
            {task.title}
          </h2>

          <p>
            {task.description}
          </p>

          <p className="text-sm text-gray-500">
            {task.timestamp}
          </p>

          <button
            onClick={() =>
              handleDelete(
                task.id
              )
            }
            className="bg-red-500 text-white px-3 py-1 rounded mt-2"
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  );
}

export default App;