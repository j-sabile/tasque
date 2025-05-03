import { useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");
export default function AddTaskModal({ refresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const [taskName, setTaskName] = useState("");

  const addTask = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API}/tasks/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskName }),
    });
    setIsOpen(false);
    refresh();
  };

  return (
    <div style={{ right: "0" }}>
      <button onClick={() => setIsOpen(true)}>Add</button>
      <ReactModal
        isOpen={isOpen}
        onAfterClose={() => setTaskName("")}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Example Modal"
        shouldCloseOnEsc={true}
        shouldReturnFocusAfterClose={true}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
          content: {
            backgroundColor: "#fff",
            color: "#000",
            width: "60%",
            maxWidth: "400px",
            margin: "auto",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #333",
            height: "fit-content",
            maxHeight: "50vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <form style={{ display: "flex", flexDirection: "column", gap: "24px" }} onSubmit={addTask}>
          <h2>Add a Task</h2>
          <input
            type="text"
            placeholder="Task Name"
            style={{ padding: "8px" }}
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            autoFocus
          />
          <div style={{ display: "flex", justifyContent: "end", gap: "12px" }}>
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button type="submit" onClick={addTask}>
              Add
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
}
