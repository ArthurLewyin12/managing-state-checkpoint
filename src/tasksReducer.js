// All the changes to the task list go through this reducer.
// It never changes the old state: it always returns a new array (immutability).

export const STORAGE_KEY = "tasks";

// A few tasks to show the first time the app is opened (when nothing is saved yet)
const exampleTasks = [
  {
    id: 1,
    name: "Finish the React checkpoint",
    description: "Add, edit, delete and complete tasks, then push it on GitHub.",
    dueDate: "2026-12-09",
    completed: false,
  },
  {
    id: 2,
    name: "Buy groceries",
    description: "Rice, tomatoes, onions and some fruits for the week.",
    dueDate: "",
    completed: true,
  },
];

// Called once when the app starts: it reads the tasks saved in localStorage.
// If there is nothing saved (first visit) or the data is broken, we use the examples.
export function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : exampleTasks;
  } catch (error) {
    return exampleTasks;
  }
}

export function tasksReducer(tasks, action) {
  switch (action.type) {
    // adds the new task at the top of the list
    case "add":
      return [{ ...action.task, id: Date.now(), completed: false }, ...tasks];

    // replaces the name, description and due date of one task
    case "edit":
      return tasks.map((task) => (task.id === action.task.id ? { ...task, ...action.task } : task));

    // switches a task between active and completed
    case "toggle":
      return tasks.map((task) => (task.id === action.id ? { ...task, completed: !task.completed } : task));

    // removes one task
    case "delete":
      return tasks.filter((task) => task.id !== action.id);

    // removes all the completed tasks at once
    case "clearCompleted":
      return tasks.filter((task) => !task.completed);

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
