import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import { tasksReducer, loadTasks, STORAGE_KEY } from "./tasksReducer";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";

// Root component: it owns the list of tasks and gives it to the other components
function App() {
  // the tasks are managed with a reducer; loadTasks reads localStorage only once, at the start
  const [tasks, dispatch] = useReducer(tasksReducer, undefined, loadTasks);
  // which tasks to show: "all", "active" or "completed"
  const [filter, setFilter] = useState("all");

  // every time the list changes, it is saved in localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // derived state: calculated from the tasks at each render, not stored separately
  const counts = {
    all: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  };
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // the confirmation for one task is in TaskItem, so here we ask for the whole group
  const clearCompleted = () => {
    if (window.confirm(`Delete the ${counts.completed} completed task(s)?`)) {
      dispatch({ type: "clearCompleted" });
    }
  };

  return (
    <main className="page">
      <header className="header">
        <h1>My tasks</h1>
        <p>
          {counts.active === 0
            ? "Everything is done."
            : `${counts.active} ${counts.active === 1 ? "task" : "tasks"} left to do`}
        </p>
      </header>

      <section className="new-task">
        <h2>New task</h2>
        <TaskForm submitLabel="Add task" onSubmit={(task) => dispatch({ type: "add", task })} />
      </section>

      <section>
        <TaskFilter filter={filter} onChange={setFilter} counts={counts} onClearCompleted={clearCompleted} />
        <TaskList
          tasks={visibleTasks}
          filter={filter}
          onToggle={(id) => dispatch({ type: "toggle", id })}
          onEdit={(task) => dispatch({ type: "edit", task })}
          onDelete={(id) => dispatch({ type: "delete", id })}
        />
      </section>
    </main>
  );
}

export default App;
