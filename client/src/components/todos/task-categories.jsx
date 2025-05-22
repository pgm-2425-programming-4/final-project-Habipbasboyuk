import { useState } from 'react';

export default function TaskCondition({ title, todos }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:1337/api/todos/${id}`, {
        method: 'DELETE',
      });
      console.log("Taak verwijderd:", id);
      setSelectedId(null);
    } catch (err) {
      console.error("Fout bij verwijderen:", err);
    }
  };

  return (
    <div className="task">
      <p className={`task__category btn-todo btn btn-${title.replace(" ", "-").toLowerCase()}`}>
        {title}
      </p>

      {todos.map((todo) => (
        <article
          className="task-card"
          key={todo.id}
          onClick={() => setSelectedId(todo.id)}
          style={{ position: 'relative' }}
        >
          <button className="task-card__button btn">{todo.category}</button>
          <p className="task-card__name">{todo.Task}</p>
          <p className="task-card__date">{todo.Deadline}</p>

          {selectedId === todo.id && (
            <div className="task-card__actions">
              <button onClick={() => {

                handleDelete(todo.id);
              }}>
                Verwijderen
              </button>
              <button onClick={(e) => {
                e.stopPropagation();
                setSelectedId(null);
              }}>
                Annuleer
              </button>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
