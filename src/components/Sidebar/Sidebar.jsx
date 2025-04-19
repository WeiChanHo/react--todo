import React, { useState } from 'react';
import ProjectList from '../ProjectList/ProjectList';
import './Sidebar.css';

function Sidebar({ 
  projects, 
  current, 
  onSelect, 
  onAddProject, 
  onAddTask 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(open => !open);

  return (
    <>
      <button
        className="side-bar-button"
        onClick={toggleSidebar}
        style={{ left: isOpen ? '180px' : '20px' }}
      >
        ☰
      </button>

      <div
        className="side-bar"
        style={{ width: isOpen ? '250px' : '0' }}
      >
        {/* 1. Show current project name */}
        {current && (
          <div className="sidebar-current-project">
            <h2 className="project-name">{current.name}</h2>
          </div>
        )}

        {/* 2. Render project list */}
        <ProjectList
          projects={projects}
          current={current}
          onSelect={onSelect}
          onAddProject={onAddProject}
        />

        {/* 3. Add Task button */}
        <button
          className="add-task-sidebar-btn"
          onClick={onAddTask}
        >
          + Add Task
        </button>
      </div>
    </>
  );
}

export default Sidebar;
