import { useState } from "react";
import fetchTodos from "../../queries/data";

export default function Header({ onAddClick, onProjectSelect, onBacklogClick }) {
  const [todos, setTodos] = useState(0);

  // Fetch todos only once on mount
  useState(() => {
    fetchTodos().then((data) => {
      const todos = data.data;
      setTodos(todos.length);
    });
  }, []);

  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (title) => {
    setActiveButton(title);
    if (title === "Toon alles") {
      onProjectSelect(null);
    } else {
      onProjectSelect(title);
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="heading">
          <h1 className="heading__title">Dashboard</h1>
          <h2 className="heading__status">
            You have <span className="highlight"> {todos} Tasks!</span>
          </h2>
        </div>

        <div className="project-container">
          {["PGM-3", "PGM-4", "Toon alles"].map((title) => (
            <button
              key={title}
              className={`btn btn-grey project-container__button project-button ${
                activeButton === title ? "active" : ""
              }`}
              onClick={() => handleClick(title)}
            >
              {title}
            </button>
          ))}
          <button onClick={onBacklogClick} className="btn project-container__button btn-backlog">
            Backlog
          </button>
          <img
            className="icon project-container__button"
            src="./src/assets/icons/add-1-svgrepo-com.svg"
            alt="Add task"
            onClick={onAddClick}
          />
        </div>
      </nav>
    </header>
  );
}
