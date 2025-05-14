import { useState } from "react";
import { postTodo } from "../../queries/data";

function TaskForm({ onClose }) {
  const [category, setCategory] = useState("Development");
  const [condition, setCondition] = useState("To do");
  const [project, setProject] = useState("");
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      data: {
        Task: task,
        Deadline: deadline,
        Condition: condition,
        category: category,
        project: { id: project }
      },
    };

    console.log("Nieuwe taak:", newTask);

    try {
      const response = await postTodo(newTask);
      console.log("✅ Taak succesvol toegevoegd:", response);
      onClose();
    } catch (error) {
      console.error("❌ Fout bij het toevoegen van de taak:", error);

      if (error.response) {
        const errorData = await error.response.json();
        console.error("Strapi Error Response:", errorData);
      }
    }
  };

  return (
    <div className="task-form-overlay">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Nieuwe taak toevoegen</h2>

        <label>
          Taak
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </label>

        <label>
          Deadline
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </label>

        <label>
          Categorie
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>

        <label>
          Status
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>
        </label>

        <label>
          Project
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            required
          >
            <option value="2">PGM-3</option>
            <option value="4">PGM-4</option>
          </select>
        </label>

        <div className="form-buttons">
          <button type="submit">Toevoegen</button>
          <button type="button" onClick={onClose}>
            Annuleren
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
