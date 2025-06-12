import { useState } from "react";
import { API_URL } from "../../constants/constants";

export default function TaskCondition({ title, todos, onEditClick, onDelete }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });
      console.log("Taak verwijderd:", id);
      setSelectedId(null);
      if (onDelete) onDelete(id);
    } catch (err) {
      console.error("Fout bij verwijderen:", err);
    }
  };

  const handleChange = async (id) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          condition: {
            title: "In progress",
          },
        }),
      });
      console.log("Taak verwijderd:", id);
      setSelectedId(null);
    } catch (err) {
      console.error("Fout bij verwijderen:", err);
    }
  };

  return (
    <div className="task">
      <p
        className={`task__category btn-todo btn btn-${title.replace(" ", "-").toLowerCase()}`}
      >
        {title}
      </p>

      {todos.map((todo) => (
        <article
          className="task-card"
          key={todo.id}
          onClick={() => setSelectedId(todo.id)}
          style={{ position: "relative" }}
        >
          <button className="task-card__button btn">{todo.category}</button>
          <p className="task-card__name">{todo.Task}</p>
          <p className="task-card__date">{todo.Deadline}</p>

          {selectedId === todo.id && (
            <div className="task-card__actions">
              <button class="btn btn-red" onClick={() => handleDelete(todo.documentId)}>Verwijderen</button>
              <button class="btn btn-orange"
                onClick={() => {
                  handleChange(todo.documentId);
                  onEditClick(todo);
                }}
              >
                Wijzig
              </button>
              <button class="btn btn-grey"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(null);
                }}
              >
                Annuleer
              </button>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
