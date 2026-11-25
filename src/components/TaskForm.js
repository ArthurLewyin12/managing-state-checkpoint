import React, { useState } from "react";

// Form used both to add a new task and to edit an existing one.
// - initialTask: the task to edit (empty when we add a new one)
// - onSubmit: called with the task when the form is valid
// - onCancel: only given in edit mode, to close the form without saving
function TaskForm({ initialTask = { name: "", description: "", dueDate: "" }, onSubmit, onCancel, submitLabel }) {
  // controlled inputs: the values live in the state of the form
  const [values, setValues] = useState(initialTask);
  const [errors, setErrors] = useState({});

  // one handler for all the fields, thanks to the "name" of each input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    // the error of a field disappears as soon as the user types in it
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  // returns an object with an error message for each empty required field
  const validate = () => {
    const newErrors = {};
    if (values.name.trim() === "") newErrors.name = "Please give the task a name.";
    if (values.description.trim() === "") newErrors.description = "Please add a short description.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit({
      ...values,
      name: values.name.trim(),
      description: values.description.trim(),
    });
    // after adding, the form is emptied (in edit mode the form is closed by the parent)
    if (!onCancel) setValues({ name: "", description: "", dueDate: "" });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor={`name-${initialTask.id || "new"}`}>Task</label>
        <input
          id={`name-${initialTask.id || "new"}`}
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="What do you need to do?"
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>

      <div className="field">
        <label htmlFor={`description-${initialTask.id || "new"}`}>Description</label>
        <textarea
          id={`description-${initialTask.id || "new"}`}
          name="description"
          rows="2"
          value={values.description}
          onChange={handleChange}
          placeholder="A few details"
          aria-invalid={Boolean(errors.description)}
        />
        {errors.description && <p className="field-error">{errors.description}</p>}
      </div>

      <div className="form-bottom">
        <div className="field date-field">
          <label htmlFor={`dueDate-${initialTask.id || "new"}`}>Due date (optional)</label>
          <input
            id={`dueDate-${initialTask.id || "new"}`}
            name="dueDate"
            type="date"
            value={values.dueDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-buttons">
          {onCancel && (
            <button type="button" className="button secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="submit" className="button">
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
