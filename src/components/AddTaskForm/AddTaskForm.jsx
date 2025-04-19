// src/components/AddTaskForm.jsx
import React, { useState } from 'react';
import './AddTaskForm.css'; 
function AddTaskForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('4');

  const handleSubmit = (e) => {
    e.preventDefault();

    const todo = {
      title,
      description,
      dueDate,
      priority,
    };

    onSubmit(todo);
    // 重設表單
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('4');
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>

      <input
        type="text"
        placeholder="Title*"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        required
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="1">Priority 1 (🔥 Highest)</option>
        <option value="2">Priority 2</option>
        <option value="3">Priority 3</option>
        <option value="4">Priority 4 (💤 Lowest)</option>
      </select>

      <div className="form-buttons">
        <button type="submit">Add Task</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}

export default AddTaskForm;
