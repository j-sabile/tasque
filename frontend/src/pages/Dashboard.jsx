import { useEffect, useState } from "react";
import AddTaskModal from "../components/AddTaskModal";
import DisplayTasks from "../components/DisplayTasks";

const Dashboard = () => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    loadTasks();
    setInterval(() => {
      loadTasks();
    }, 5000);
  }, []);

  const loadTasks = async () => {
    const res = await fetch(`${import.meta.env.VITE_API}/tasks/`, { credentials: "include" });
    if (!res.ok) return;
    const data = await res.json();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    await fetch(`${import.meta.env.VITE_API}/tasks/${id}`, { method: "DELETE", credentials: "include" });
    loadTasks();
  };

  const handleComplete = async (id) => {
    await fetch(`${import.meta.env.VITE_API}/tasks/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
    loadTasks();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="text-6xl font-semibold">My Tasks</h1>
        <AddTaskModal refresh={loadTasks} />
      </div>
      <h2 className="text-3xl m-4 font-semibold">Pending</h2>
      <DisplayTasks tasks={tasks?.filter((e) => !e.completed)} handleComplete={handleComplete} handleDelete={handleDelete} />

      <h2 className="text-3xl m-4 font-semibold">Completed</h2>
      <DisplayTasks tasks={tasks?.filter((e) => e.completed)} handleDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;
