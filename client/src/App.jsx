import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTodos } from "./queries/data";

import Header from "./components/header/header.jsx";
import TaskCondition from "./components/todos/task-categories.jsx";
import TaskForm from "./components/form/task-form.jsx";
import Backlog from "./components/backlog/Backlog";
import EditTaskForm from "./components/form/edit-task-form.jsx";

function App({ projectId }) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showBacklog, setShowBacklog] = useState(false);
  const [editTaskFormActive, setEditTaskFormActive] = useState(null);

  const todos = data?.data || [];

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

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Er is een fout opgetreden bij het laden van de taken.</div>;

  const refetchTodos = async () => {
    await queryClient.invalidateQueries(["todos"]);
  };

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
            onDelete={async () => {
              await refetchTodos();
            }}
          />
          <TaskCondition
            title="In progress"
            todos={filteredTodos("In progress")}
            onEditClick={setEditTaskFormActive}
            onDelete={async () => {
              await refetchTodos();
            }}
          />
          <TaskCondition
            title="Done"
            todos={filteredTodos("Done")}
            onEditClick={setEditTaskFormActive}
            onDelete={async () => {
              await refetchTodos();
            }}
          />
        </article>
      </>

      {editTaskFormActive && (
        <EditTaskForm
          task={editTaskFormActive}
          onClose={() => setEditTaskFormActive(null)}
          onSave={refetchTodos}
        />
      )}

      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onTaskAdded={refetchTodos}
        />
      )}
    </>
  );
}

export default App;
