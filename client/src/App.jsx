import { useState, useEffect } from "react";
import { fetchTodos } from "./queries/data";
import { useRouter } from '@tanstack/react-router';
import Header from "./components/header/header.jsx";
import TaskCondition from "./components/todos/task-categories.jsx";
import TaskForm from "./components/form/task-form.jsx";
import Backlog from "./components/backlog/Backlog";
import EditTaskForm from "./components/form/edit-task-form.jsx";
function App() {
  const [todos, setTodos] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showBacklog, setShowBacklog] = useState(false);
  const [editTaskFormActive, setEditTaskFormActive] = useState(null);
  useEffect(() => {
    fetchTodos().then((data) => {
      setTodos(data.data);
    });
  }, [todos]);


  const router = useRouter();
  const currentPath = router.state.location.pathname;

const filteredTodos = (status) =>
    todos
      .filter((todo) => todo.condition.title === status)
      .filter((todo) => {
        if (currentPath === '/pgm-4') {
          return todo.project && todo.project.title === 'PGM-4';
        }

        if (currentPath === '/pgm-3') {
          return todo.project && todo.project.title === 'PGM-3';
        }

        
        if (selectedProject) {
          return todo.project && todo.project.title === selectedProject;
        }
        return true;
      });

  return (
    <>
      <Header
        onAddClick={() => setShowForm(true)}
        onProjectSelect={setSelectedProject}
        onBacklogClick={() => setShowBacklog((prev) => !prev)}
      />

      <>
        {showBacklog && (
          <div className="backlog-overlay">
            <Backlog />
          </div>
        )}

        <article className="task-container">
          <TaskCondition
            title="To do"
            todos={filteredTodos("To do")}
  onEditClick={setEditTaskFormActive}
          />
          <TaskCondition
            title="In progress"
            todos={filteredTodos("In progress")}
  onEditClick={setEditTaskFormActive}
          />
          <TaskCondition
            title="Done"
            todos={filteredTodos("Done")}
  onEditClick={setEditTaskFormActive}
          />
        </article>
      </>

      {editTaskFormActive && (
        <EditTaskForm
          task={editTaskFormActive}
          onClose={() => setEditTaskFormActive(null)}
        />
      )}

      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onTaskAdded={(newTask) => setTodos([...todos, newTask.data])}
        />
      )}
    </>
  );
}

export default App;
