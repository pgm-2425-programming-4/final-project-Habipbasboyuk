import { useState, useEffect } from "react";
import { fetchTodos } from "./queries/data";

import Header from "./components/header/header.jsx";
import TaskCondition from "./components/todos/task-categories.jsx";
import TaskForm from "./components/form/task-form.jsx";
import Backlog from "./components/backlog/Backlog";
import EditTaskForm from "./components/form/edit-task-form.jsx";
function App({ projectId }) {
  const [todos, setTodos] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showBacklog, setShowBacklog] = useState(false);
  const [editTaskFormActive, setEditTaskFormActive] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetchTodos().then((data) => {
      setTodos(data.data);
      setLoading(false);
    });
  }, []);



  const filteredTodos = (status) =>
    todos
      .filter((todo) => todo.condition && todo.condition.title === status)
      .filter((todo) => {
        if (projectId) {
          return todo.project && String(todo.project.id) === String(projectId);
        }
        if (selectedProject) {
          return todo.project && todo.project.title === selectedProject;
        }
        return true;
      });

  if (loading) {
    return <div>Loading...</div>; // of een spinner component
  }
  
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
            onDelete={(id) =>
              setTodos((todos) =>
                todos.filter((todo) => todo.documentId !== id)
              )
            }
          />
          <TaskCondition
            title="In progress"
            todos={filteredTodos("In progress")}
            onEditClick={setEditTaskFormActive}
            onDelete={(id) =>
              setTodos((todos) =>
                todos.filter((todo) => todo.documentId !== id)
              )
            }
          />
          <TaskCondition
            title="Done"
            todos={filteredTodos("Done")}
            onEditClick={setEditTaskFormActive}
            onDelete={(id) =>
              setTodos((todos) =>
                todos.filter((todo) => todo.documentId !== id)
              )
            }
          />
        </article>
      </>

      {editTaskFormActive && (
        <EditTaskForm
          task={editTaskFormActive}
          onClose={() => setEditTaskFormActive(null)}
          onSave={async () => {
            const data = await fetchTodos();
            setTodos(data.data);
          }}
        />
      )}

      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onTaskAdded={async () => {
            const data = await fetchTodos();
            setTodos(data.data);
          }}
        />
      )}
    </>
  );
}

export default App;
