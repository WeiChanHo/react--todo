import React, { useState } from 'react';
import ProjectList from '../ProjectList/ProjectList';
import './Sidebar.css';

function Sidebar({ projects, current, onSelect, onAddProject }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

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
        <ProjectList
          projects={projects}
          current={current}
          onSelect={onSelect}
          onAddProject={onAddProject}
        />
      </div>
    </>
  );
}

export default Sidebar;
