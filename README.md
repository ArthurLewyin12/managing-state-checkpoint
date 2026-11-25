# Managing State Checkpoint - To-Do List

This is my checkpoint for Managing State in React. It's a to-do list where you can add, edit, delete and complete tasks. The tasks are saved in the browser, so they are still there when you come back.

## How to run it

```bash
npm install
npm start
```

Then open http://localhost:3000 in the browser.

## What the app does

- **Add a task**: the form at the top has a name, a description and an optional due date. The name and the description are required: if one is empty, an error message appears under the field and the task is not added.
- **Complete a task**: click the checkbox. A completed task is crossed out and lighter, with a green check.
- **Edit a task**: click on the text of the task (or on the pencil). The same form opens in the list, filled with the task details, with "Save" and "Cancel".
- **Delete a task**: click the bin. The app asks "Delete this task?" with a "Delete" and a "Keep" button before removing it.
- **Filter**: "All", "Active" or "Completed", with the number of tasks in each one. "Clear completed" removes all the completed tasks at once (after a confirmation).
- **Due dates** (optional feature): a task with a date before today that is not done shows "Late" in red.

## Files

- `src/App.js`: the root component. It owns the tasks and the filter, and passes them to the other components.
- `src/tasksReducer.js`: the reducer with all the actions on the tasks (`add`, `edit`, `toggle`, `delete`, `clearCompleted`) and the function that loads the tasks from localStorage
- `src/components/TaskForm.js`: the form with the validation, used both to add and to edit a task
- `src/components/TaskList.js`: shows the list, or a message when there is no task
- `src/components/TaskItem.js`: one task, with its checkbox, its buttons, the edit mode and the delete confirmation
- `src/components/TaskFilter.js`: the All / Active / Completed buttons

Each file has comments to explain what the component and its functions do.

## How the state is managed

- **useReducer** for the tasks: all the changes go through one function, so it's easy to see everything that can happen to the list. The reducer always returns a new array and never changes the old one.
- **localStorage** to keep the tasks:
  - when the app starts, `useReducer` gets the tasks from localStorage (with a function, so it's only read once). If nothing is saved yet, two example tasks are shown.
  - a `useEffect` saves the list in localStorage every time it changes
- **useState** for the things that only matter to one component: the filter in `App`, the form values and errors in `TaskForm`, and the edit or confirm mode of each `TaskItem`
- **Controlled inputs**: the values of the form are in the state, with one `handleChange` for all the fields (it uses the `name` of each input)
- **Derived state**: the number of tasks in each filter and the list of visible tasks are calculated from the tasks at each render, they are not stored in another state
- **Lifted state**: the tasks are in `App` because the form, the filter and the list all need them

## Design

- the Libre Franklin font from Google Fonts
- a paper-white background, dark text, green for completed tasks and red for delete, errors and late tasks
- icons from Iconsax (`iconsax-reactjs`): pencil, bin and calendar
- on a phone, the buttons of a task go under its text
