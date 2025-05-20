import { useState, useEffect } from "react";
import { fetchTodos } from "./queries/data";
import Header from "./components/header/header.jsx";
import TaskCondition from "./components/todos/task-categories.jsx";
import TaskForm from "./components/form/task-form.jsx";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); 
  const [showForm, setShowForm] = useState(false);




  useEffect(() => {
    fetchTodos().then((data) => {
      setTodos(data.data);
    });
  }, [todos]);

  const filteredTodos = (status) =>
    todos
      .filter((todo) => todo.condition.title === status)
      .filter(
        (todo) =>
          !selectedProject ||
          (todo.project && todo.project.title === selectedProject)
      );

  return (
    <>
    
      <Header onAddClick={() => setShowForm(true)} onProjectSelect={setSelectedProject} />
      




      <article className="task-container">
        <TaskCondition title="To do" todos={filteredTodos("To do")} />
        <TaskCondition title="In progress" todos={filteredTodos("In progress")} />
        <TaskCondition title="Done" todos={filteredTodos("Done")} />
      </article>




        {showForm && (
          <TaskForm
            onClose={() => setShowForm(false)}
            onTaskAdded={(newTask) => setTodos([...todos, newTask.data])}
          />)}
    </>
  );
}

export default App;
