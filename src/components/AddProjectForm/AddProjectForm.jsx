import React, { useState } from 'react';
import './AddProjectForm.css';

function AddProjectForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
    setName('');
  };

  return (
    <div className="add-project-dialog">
      <form className="add-project-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="add-project-input"
          placeholder="Project Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <div className="add-project-btn-container">
          <button type="submit" className="add-project-submit">
            Add Project
          </button>
          <button
            type="button"
            className="add-project-close"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProjectForm;
