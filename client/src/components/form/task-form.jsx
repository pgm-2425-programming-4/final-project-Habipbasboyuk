import { useState, useEffect } from "react";
import { postTodo } from "../../queries/data";

import { API_URL } from "../../constants/constants";

function TaskForm({ onClose }) {
  const [category, setCategory] = useState("Development");
  const [condition, setCondition] = useState("");
  const [project, setProject] = useState("");
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [conditions, setConditions] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {

    fetch(`${API_URL}/conditions`)
      .then(res => res.json())
      .then(data => setConditions(data.data || []));

    fetch(`${API_URL}/projects`)
      .then(res => res.json())
      .then(data => setProjects(data.data || []));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      data: {
        category: category,
        Task: task,
        Deadline: deadline,
<<<<<<< HEAD:src/components/form/task-form.jsx
        project: { id: Number(project) },
        condition: { id: Number(condition) }
=======
        condition: condition ? { id: Number(condition) } : undefined,
        category: category,
        project: project ? { id: Number(project) } : undefined,
>>>>>>> 2b5fa8fc4775483e8d7229c767bd7496dc9da25b:client/src/components/form/task-form.jsx
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
<<<<<<< HEAD:src/components/form/task-form.jsx
            className="task-form__input"
=======
            className="task-form__input btn input-form"
>>>>>>> 2b5fa8fc4775483e8d7229c767bd7496dc9da25b:client/src/components/form/task-form.jsx
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </label>

        <label className="task-form__label">
          Deadline
          <input
            type="date"
<<<<<<< HEAD:src/components/form/task-form.jsx
            className="task-form__input"
=======
            className="task-form__input btn input-form"
>>>>>>> 2b5fa8fc4775483e8d7229c767bd7496dc9da25b:client/src/components/form/task-form.jsx
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </label>

        <label className="task-form__label">
          Categorie
          <input
            type="text"
<<<<<<< HEAD:src/components/form/task-form.jsx
            className="task-form__input"
=======
            className="task-form__input btn input-form"
>>>>>>> 2b5fa8fc4775483e8d7229c767bd7496dc9da25b:client/src/components/form/task-form.jsx
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>

        <label className="task-form__label">
          Status
          <select
<<<<<<< HEAD:src/components/form/task-form.jsx
            className="task-form__input"
=======
            className="task-form__input btn input-form"
>>>>>>> 2b5fa8fc4775483e8d7229c767bd7496dc9da25b:client/src/components/form/task-form.jsx
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
<<<<<<< HEAD:src/components/form/task-form.jsx
            <option value="0">status</option>
            <option value="1">To do</option>
            <option value="3">In progress</option>
            <option value="5">Done</option>
            <option value="8">Backlog</option>
=======
            <option value="">status</option>
            {conditions.map(condition => (
              <option key={condition.id} value={condition.id}>
                {condition.title}
              </option>
            ))}
>>>>>>> 2b5fa8fc4775483e8d7229c767bd7496dc9da25b:client/src/components/form/task-form.jsx
          </select>
        </label>

        <label className="task-form__label">
          Project
          <select
<<<<<<< HEAD:src/components/form/task-form.jsx
            className="task-form__input"
=======
            className="task-form__input btn input-form"
>>>>>>> 2b5fa8fc4775483e8d7229c767bd7496dc9da25b:client/src/components/form/task-form.jsx
            value={project}
            onChange={(e) => setProject(e.target.value)}
            required
          >
<<<<<<< HEAD:src/components/form/task-form.jsx
            <option value="0">project</option>
            <option value="2">PGM-3</option>
            <option value="4">PGM-4</option>
=======
            <option value="">Kies project</option>
            {projects.map(proj => (
              <option key={proj.id} value={proj.id}>
                {proj.title}
              </option>
            ))}
>>>>>>> 2b5fa8fc4775483e8d7229c767bd7496dc9da25b:client/src/components/form/task-form.jsx
          </select>
        </label>

        <div className="form-buttons">
<<<<<<< HEAD:src/components/form/task-form.jsx
          <button className=" btn btn-done btn-add" type="submit">Toevoegen</button>
          <button className="btn btn-in-progress btn-discard" type="button" onClick={onClose}>
=======
          <button className="task-form__btn btn btn-form btn-done" type="submit">Toevoegen</button>
          <button className="task-form__btn btn" type="button" onClick={onClose}>
>>>>>>> 2b5fa8fc4775483e8d7229c767bd7496dc9da25b:client/src/components/form/task-form.jsx
            Annuleren
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;