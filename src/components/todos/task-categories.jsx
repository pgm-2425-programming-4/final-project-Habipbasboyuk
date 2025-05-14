export default function TaskCondition({ title, todos }) {
  return (
    <div className="task">
      <p className={`task__category btn-todo btn btn-${title.replace(" ", "-").toLowerCase()}`}>
        {title}
      </p>
      {todos.map((todo) => (
        <article className="task-card" key={todo.id}>
          <button className="task-card__button btn">{todo.category}</button>
          <p className="task-card__name">{todo.Task}</p>
          <p className="task-card__date">{todo.Deadline}</p>
        </article>
      ))}
    </div>
  );
}