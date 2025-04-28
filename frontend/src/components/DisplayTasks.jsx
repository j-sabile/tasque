const DisplayTasks = ({ tasks, handleDelete, handleComplete }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "40px" }}>
      {tasks?.map((task, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            border: "1px solid black",
            minHeight: "150px",
            minWidth: "200px",
            paddingBottom: "12px",
            maxWidth: "300px",
            borderRadius: "12px",
          }}
        >
          <h3>{task.title}</h3>
          {!task.completed && <button onClick={() => handleComplete(task._id)}>✔</button>}
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
export default DisplayTasks;
