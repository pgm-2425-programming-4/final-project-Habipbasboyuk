import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { fetchProjects, fetchTodos } from "../../queries/data.js";
import addIcon from '../../assets/icons/add-1-svgrepo-com.svg';

export default function Header({ onAddClick, onProjectSelect }) {
  const [todos, setTodos] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchTodos().then((data) => {
      setTodos(data.data || []);
    });
  }, []);

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data.data || []);
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
            You have <span className="highlight"> {todos.length} Tasks!</span>
          </h2>
        </div>

        <div className="project-container">
          {projects.map((project) => (
            <Link
              to="/projects/$projectId"
              params={{ projectId: project.id }}
              key={project.id}
            >
              <button
                className={`btn btn-grey project-container__button project-button ${
                  activeButton === project.title ? "active" : ""
                }`}
                onClick={() => handleClick(project.title)}
                type="button"
              >
                {project.title}
              </button>
            </Link>
          ))}
          <Link
            to="/backlog"
            className="btn project-container__button btn-backlog"
          >
            Backlog
          </Link>
          <img
            className="icon project-container__button"
            src={addIcon}
            alt="Add task"
            onClick={onAddClick}
          />
        </div>
      </nav>
    </header>
  );
}
