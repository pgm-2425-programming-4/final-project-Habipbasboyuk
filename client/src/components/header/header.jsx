import { useState } from "react";
import { fetchTodos } from "../../queries/data";
import { Link } from "@tanstack/react-router"; // Add this import

export default function Header({ onAddClick, onProjectSelect }) {
  const [todos, setTodos] = useState([]);

  fetchTodos().then((data) => {
    const todos = data.data;
    setTodos(todos.length);
  });

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
            <Link
              to={`/${title === "Toon alles" ? "" : title.toLowerCase()}`}
              key={title}
            >
              <button
                className={`btn btn-grey project-container__button project-button ${
                  activeButton === title ? "active" : ""
                }`}
                onClick={() => handleClick(title)}
                type="button"
              >
                {title}
              </button>
            </Link>

          ))}
          <Link to="/backlog" className="btn project-container__button btn-backlog">
            Backlog
          </Link>
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