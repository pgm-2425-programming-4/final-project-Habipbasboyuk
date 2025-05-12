import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/todos")
      .then(res => res.json())
      .then(data => {
        console.log("API data:", data);
        setTodos(data.data);
      })
      .catch(err => console.error("Fout bij ophalen:", err));
  }, []);

  return (
    <section className="task-container">

  <div className="task">
    <p className="task__category btn btn-todo">To Do's</p>
    {todos
      .filter(todo => todo.Condition === "To do")
      .map(todo => (
        <article className="task-card" key={todo.id}>
          <button className="task-card__button btn">{todo.category}</button>
          <p className="task-card__name">{todo.Task}</p>
          <p className="task-card__date">{todo.Deadline}</p>
        </article>
      ))}
  </div>


  <div className="task">
    <p className="task__category btn btn-in-progress">In Progress</p>
    {todos
      .filter(todo => todo.Condition === "In progress")
      .map(todo => (
        <article className="task-card" key={todo.id}>
          <button className="task-card__button btn">{todo.category}</button>
          <p className="task-card__name">{todo.Task}</p>
          <p className="task-card__date">{todo.Deadline}</p>
        </article>
      ))}
  </div>

  {/* Done */}
  <div className="task">
    <p className="task__category btn btn-done">Done</p>
    {todos
      .filter(todo => todo.Condition === "Done")
      .map(todo => (
        <article className="task-card" key={todo.id}>
          <button className="task-card__button btn">{todo.category}</button>
          <p className="task-card__name">{todo.Task}</p>
          <p className="task-card__date">{todo.Deadline}</p>
        </article>
      ))}
  </div>
</section>

    
  );
}

export default App;
