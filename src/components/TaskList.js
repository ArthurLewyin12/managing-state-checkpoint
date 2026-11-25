import React from "react";
import TaskItem from "./TaskItem";

// Shows the tasks received from App, or a message when there is none
function TaskList({ tasks, filter, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    const messages = {
      all: "No task yet. Add your first one above.",
      active: "Nothing left to do. Nice!",
      completed: "No completed task yet.",
    };
    return <p className="empty">{messages[filter]}</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TaskList;
