import React from 'react';
import './ProjectList.css';

function ProjectList({ projects, current, onSelect, onAddProject }) {
  return (
    <div className="project-list">
      <div className="project-header">
        <h2 className="project-list-title">My Projects</h2>
        <button
          className="add-project-header-btn"
          onClick={onAddProject}
        >
        +
        </button>
      </div>
      
      {projects.map((project, idx) => (
        <button
          key={idx}
          className={`project-btn ${project === current ? 'active' : ''}`}
          onClick={() => onSelect(project)}
        >
          {project.name}
        </button>
        
      ))}
    </div>
  );
}

export default ProjectList;