import React from 'react';
import './ProjectList.css';

function ProjectList({ projects, current, onSelect, onAddProject, onEditProject, onDeleteProject }) {
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
                <div key={idx} className="project-row">
                    <button
                        className={`project-btn ${project === current ? 'active' : ''}`}
                        onClick={() => onSelect(project)}
                    >
                        <span className="project-name-text">{project.name}</span>
                    </button>

                    <button
                        className="edit-project"
                        onClick={() => onEditProject(project)}
                        title="Edit project name"
                    >✏️</button>

                    {project !== projects[0] && (       /* don’t delete Home */
                        <button
                            className="delete-project"
                            onClick={() => onDeleteProject(project)}
                            title="Delete project"
                        >🗑️</button>
                    )}
                </div>
            ))}
        </div>

    );
}

export default ProjectList;