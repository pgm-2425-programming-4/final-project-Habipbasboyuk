import React from 'react';
import { useState } from 'react';
import { fetchTodos } from '../../queries/data';
export default function Header({ onProjectSelect }) {


  const [todos, setTodos] = useState([]);

fetchTodos().then(data => {
             const todos = data.data;
             setTodos(todos.length);
            })


  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (title) => {
    setActiveButton(title); // Update de actieve knop
    if (title === "Toon alles") {
      onProjectSelect(null); // toon alles
    } else {
      onProjectSelect(title); // toon specifieke project
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
              className={`btn btn-grey project-container__button project-button ${activeButton === title ? 'active' : ''}`}
              onClick={() => handleClick(title)}
            >
              {title}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
