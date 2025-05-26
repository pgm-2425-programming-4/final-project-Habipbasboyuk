import { useState } from "react";
import fetchTodos from "../../queries/data";


<<<<<<< HEAD:src/components/header/header.jsx
export default function Header({ onAddClick, onProjectSelect, onToggleBacklog }) {
  // const [todos, setTodos] = useState([]);
=======
export default function Header({ onAddClick, onProjectSelect, onBacklogClick }) {
>>>>>>> 2b5fa8fc4775483e8d7229c767bd7496dc9da25b:client/src/components/header/header.jsx
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
<<<<<<< HEAD:src/components/header/header.jsx
          <button onClick={onToggleBacklog} className="btn project-container__button btn-backlog">
=======
          <button onClick={onBacklogClick} className="btn project-container__button btn-backlog">
>>>>>>> 2b5fa8fc4775483e8d7229c767bd7496dc9da25b:client/src/components/header/header.jsx
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
