import { useState, useEffect } from "react";
import fetchTodos from "./queries/data";
import Header from "./components/header/header.jsx";
import TaskCondition from "./components/todos/task-categories.jsx";
import TaskForm from "./components/form/task-form.jsx";
import PaginatedBacklog from "./components/Backlog/PaginatedBacklog.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  const [todos, setTodos] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); 
  const [showForm, setShowForm] = useState(false);
  const [showBacklog, setShowBacklog] = useState(false);

 useEffect(() => {
  const loadTodos = async () => {
    try {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos.data);
    } catch (error) {
      console.error("Fout bij ophalen van taken:", error);
    }
  };

  loadTodos();
}, []);

  const filteredTodos = (status) =>
    todos
      .filter((todo) => todo.condition.Title === status)
      .filter(
        (todo) =>
          !selectedProject ||
          (todo.project && todo.project.title === selectedProject)
      );

  return (
    <>
      <Header
        onToggleBacklog={() => setShowBacklog(!showBacklog)}
        onAddClick={() => setShowForm(true)}
        onProjectSelect={setSelectedProject}
      />

      <article className="task-container">
        <TaskCondition title="To do" todos={filteredTodos("To do")} />
        <TaskCondition title="In progress" todos={filteredTodos("In progress")} />
        <TaskCondition title="Done" todos={filteredTodos("Done")} />

        {/* ➕ Hier wordt het formulier getoond als showForm true is */}
        {showForm && (
          <TaskForm
            onClose={() => setShowForm(false)}
            onTaskAdded={(newTask) => setTodos([...todos, newTask.data])}
          />
        )}
      </article>

      {showBacklog && (
        <QueryClientProvider client={queryClient}>
          <article>
            <PaginatedBacklog />
          </article>
        </QueryClientProvider>
      )}
    </>
  );
}

export default App;
