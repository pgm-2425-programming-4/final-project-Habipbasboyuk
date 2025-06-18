import { useState, useEffect } from "react";
import { API_URL } from "../../constants/constants";

export default function EditTaskForm({ task, onClose, onSave }) {
  const [taskValue, setTaskValue] = useState(task.Task || "");
  const [categoryValue, setCategoryValue] = useState(task.category || "");
  const [conditionValue, setConditionValue] = useState(task.condition?.id || "");
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/conditions`)
      .then((res) => res.json())
      .then((data) => setConditions(data.data || []));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = {
      Task: taskValue,
      category: categoryValue,
      condition: conditionValue ? { id: Number(conditionValue) } : undefined,
    };
    await fetch(`${API_URL}/todos/${task.documentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: updatedTask }),
    });
    if (onSave) await onSave();
    onClose();
  };

  return (
    <form class="task-form-container" onSubmit={handleSubmit}>
      <label className="task-form__label">
        Taak
        <input
          type="text"
          className="task-form__input btn input-form"
          value={taskValue}
          onChange={(e) => setTaskValue(e.target.value)}
          required
        />
      </label>

      <label className="task-form__label">
        Categorie
        <input
          type="text"
          className="task-form__input btn input-form"
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)}
          required
        />
      </label>

      <label className="task-form__label">
        Status
        <select
          className="task-form__input btn input-form"
          value={conditionValue}
          onChange={(e) => setConditionValue(e.target.value)}
          required
        >
          <option value="">status</option>
          {conditions.map((condition) => (
            <option key={condition.id} value={condition.id}>
              {condition.title}
            </option>
          ))}
        </select>
      </label>

      <div className="form-buttons">
        <button className="task-form__btn btn btn-form btn-done" type="submit">
          Opslaan
        </button>
        <button className="task-form__btn btn" type="button" onClick={onClose}>
          Annuleren
        </button>
      </div>
    </form>
  );
}