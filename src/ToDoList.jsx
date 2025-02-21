import { useState, useEffect } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Update localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addOrUpdateTask = () => {
    if (newTask.trim() === "") return; // Prevent adding empty tasks

    if (editingIndex !== null) {
      // Update task
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = newTask;
      setTasks(updatedTasks);
      setEditingIndex(null); // Reset editing index
    } else {
      // Add new task
      setTasks([...tasks, newTask]);
    }

    setNewTask(""); // Clear input field
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Save immediately
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save immediately
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save immediately
    }
  };

  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save immediately
    }
  };

  const startUpdatingTask = (index) => {
    setNewTask(tasks[index]); // Load the task into input
    setEditingIndex(index); // Set the index for updating
  };

  return (
    <div className="to-do-list">
      <h1>To-do-list</h1>

      <div className="size">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addOrUpdateTask}>
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            <button className="delete-button" onClick={() => deleteTask(index)}>
              Delete
            </button>
            <button className="move-button" onClick={() => moveTaskUp(index)}>
              Up
            </button>
            <button className="move-button" onClick={() => moveTaskDown(index)}>
              Down
            </button>
            <button
              className="update-button"
              onClick={() => startUpdatingTask(index)}
            >
              Edit
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
