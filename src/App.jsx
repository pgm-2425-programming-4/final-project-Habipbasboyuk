import { useState, useEffect } from "react";
import { fetchTodos } from "./queries/data";
import Header from "./components/header/header.jsx"; // Importeer je header component

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); // Hier bewaar je het geselecteerde project

  useEffect(() => {
    fetchTodos().then((data) => {
      setTodos(data.data);
    });
  }, []);

  return (
    <>
      <Header onProjectSelect={setSelectedProject} />

      <section className="task-container">
        {/* To do */}
        <div className="task">
          <p className="task__category btn btn-todo">To do</p>
          {todos
            .filter((todo) => todo.Condition === "To do")
            .filter(
              (todo) =>
                !selectedProject || (todo.project && todo.project.title === selectedProject)
            )
            .map((todo) => (
              <article className="task-card" key={todo.id}>
                <button className="task-card__button btn">{todo.category}</button>
                <p className="task-card__name">{todo.Task}</p>
                <p className="task-card__date">{todo.Deadline}</p>
              </article>
            ))}
        </div>

        {/* In progress */}
        <div className="task">
          <p className="task__category btn btn-in-progress">In progress</p>
          {todos
            .filter((todo) => todo.Condition === "In progress")
            .filter(
              (todo) =>
                !selectedProject || (todo.project && todo.project.title === selectedProject)
            )
            .map((todo) => (
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
            .filter((todo) => todo.Condition === "Done")
            .filter(
              (todo) =>
                !selectedProject || (todo.project && todo.project.title === selectedProject)
            )
            .map((todo) => (
              <article className="task-card" key={todo.id}>
                <button className="task-card__button btn">{todo.category}</button>
                <p className="task-card__name">{todo.Task}</p>
                <p className="task-card__date">{todo.Deadline}</p>
              </article>
            ))}
        </div>
      </section>
    </>
  );
}

export default App;
