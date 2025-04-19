import React from 'react';
import './ProjectTitleBar.css';

function ProjectTitleBar({ name, onAddTask }) {
  return (
    <div className="project-title-bar">
      <h2 className="project-name">{name}</h2>
      <button className="add-task-btn" onClick={onAddTask}>
        + Add Task
      </button>
    </div>
  );
}

export default ProjectTitleBar;