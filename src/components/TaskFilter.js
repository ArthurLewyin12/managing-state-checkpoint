import React from "react";

// Buttons to show all the tasks, only the active ones or only the completed ones.
// The counts come from App (they are derived state, calculated from the task list).
function TaskFilter({ filter, onChange, counts, onClearCompleted }) {
  const options = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="filter-bar">
      <div className="tabs" role="group" aria-label="Filter the tasks">
        {options.map((option) => (
          <button
            key={option.value}
            className={filter === option.value ? "tab active" : "tab"}
            aria-pressed={filter === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label} <span className="tab-count">{counts[option.value]}</span>
          </button>
        ))}
      </div>
      {counts.completed > 0 && (
        <button className="link-button" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  );
}

export default TaskFilter;
