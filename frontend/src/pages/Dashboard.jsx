import { useEffect, useState } from "react";
import AddTaskModal from "../components/AddTaskModal";
import DisplayTasks from "../components/DisplayTasks";

const Dashboard = () => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    loadTasks();
  });

  const loadTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks/");
    if (!res.ok) return;
    const data = await res.json();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
  };

  const handleComplete = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ completed: true }),
    });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>My Tasks</h1>
        <AddTaskModal refresh={loadTasks} />
      </div>
      <h2>Pending</h2>
      <DisplayTasks tasks={tasks?.filter((e) => !e.completed)} handleComplete={handleComplete} handleDelete={handleDelete} />

      <h2>Completed</h2>
      <DisplayTasks tasks={tasks?.filter((e) => e.completed)} handleDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;
