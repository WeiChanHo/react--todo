import React from 'react';
import './ProjectList.css';

function ProjectList({ projects, current, onSelect, onAddProject }) {
  return (
    <div className="project-list">
      <h2 className="project-list-title">My Projects</h2>
      {projects.map((project, idx) => (
        <button
          key={idx}
          className={`project-btn ${project === current ? 'active' : ''}`}
          onClick={() => onSelect(project)}
        >
          {project.name}
        </button>
      ))}
      <button
        className="add-project-btn"
        onClick={onAddProject}
      >
        + Add Project
      </button>
    </div>
  );
}

export default ProjectList;
