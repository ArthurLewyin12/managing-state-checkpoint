import React, { useState } from "react";
import { Edit2, Trash, Calendar1 } from "iconsax-reactjs";
import TaskForm from "./TaskForm";

// Shows "Dec 9" (or "Dec 9, 2027" if it's not this year) from "2026-12-09"
function formatDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  const sameYear = date.getFullYear() === new Date().getFullYear();
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(sameYear ? {} : { year: "numeric" }),
  });
}

// One task of the list. It has 3 modes:
// - normal: shows the task with its buttons
// - editing: shows the form pre-filled with the task
// - confirming: asks "Delete this task?" before deleting it
function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  // a task is late if it has a due date before today and is not completed
  // (today's date written like "2026-12-09", in the local time of the user)
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const isLate = task.dueDate && task.dueDate < today && !task.completed;

  if (isEditing) {
    return (
      <li className="task editing">
        <TaskForm
          initialTask={task}
          submitLabel="Save"
          onSubmit={(updatedTask) => {
            onEdit(updatedTask);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </li>
    );
  }

  return (
    <li className={task.completed ? "task completed" : "task"}>
      <input
        type="checkbox"
        className="task-check"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={task.completed ? `Mark "${task.name}" as active` : `Mark "${task.name}" as completed`}
      />

      {/* clicking on the text of the task opens the edit form */}
      <button className="task-content" onClick={() => setIsEditing(true)}>
        <span className="task-name">{task.name}</span>
        <span className="task-description">{task.description}</span>
        {task.dueDate && (
          <span className={isLate ? "task-date late" : "task-date"}>
            <Calendar1 size={14} color="currentColor" variant="Linear" />
            {isLate ? "Late, was due " : "Due "}
            {formatDate(task.dueDate)}
          </span>
        )}
      </button>

      {isConfirming ? (
        <div className="confirm">
          <span>Delete this task?</span>
          <button className="button danger small" onClick={() => onDelete(task.id)}>
            Delete
          </button>
          <button className="button secondary small" onClick={() => setIsConfirming(false)}>
            Keep
          </button>
        </div>
      ) : (
        <div className="task-actions">
          <button className="icon-button" onClick={() => setIsEditing(true)} aria-label={`Edit "${task.name}"`}>
            <Edit2 size={18} color="currentColor" variant="Linear" />
          </button>
          <button
            className="icon-button delete"
            onClick={() => setIsConfirming(true)}
            aria-label={`Delete "${task.name}"`}
          >
            <Trash size={18} color="currentColor" variant="Linear" />
          </button>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
