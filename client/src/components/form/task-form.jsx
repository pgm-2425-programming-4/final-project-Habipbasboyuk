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
      condition: condition,
      category: category,
      project: { id: Number(project) }
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
    <div className="task-form-container">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Nieuwe taak toevoegen</h2>

        <label className="task-form__label">
          Taak
          <input
            type="text"
            className="task-form__input btn input-form"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </label>

        <label className="task-form__label">
          Deadline
          <input
            type="date"
            className="task-form__input btn input-form"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </label>

        <label className="task-form__label">
          Categorie
          <input
            type="text"
            className="task-form__input btn input-form"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>

        <label className="task-form__label">
          Status
          <select
            className="task-form__input btn input-form"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <option value="">status</option>
            <option value="11">To do</option>
            <option value="13">In progress</option>
            <option value="15">Done</option>
            <option value="17">Backlog</option>
          </select>
        </label>

        <label className="task-form__label">
          Project
          <select
            className="task-form__input btn input-form"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            required
          >
            <option value="">Kies project</option>
            <option value="2">PGM-3</option>
            <option value="4">PGM-4</option>
          </select>
        </label>

        <div className="form-buttons">
          <button className="task-form__btn btn btn-form btn-done" type="submit">Toevoegen</button>
          <button className="task-form__btn btn" type="button" onClick={onClose}>
            Annuleren
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
