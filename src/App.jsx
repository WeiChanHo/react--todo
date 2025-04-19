// src/App.jsx
import { useEffect, useState } from 'react';
import './index.css';            // global resets
// import './App.css';          // optional—only if you need shared layout styles

import Sidebar from './components/Sidebar/Sidebar';
import ProjectList from './components/ProjectList/ProjectList';
import ProjectTitleBar from './components/ProjectTitleBar/ProjectTitleBar';
import TodoList from './components/TodoList/TodoList';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import AddProjectForm from './components/AddProjectForm/AddProjectForm';

import { projects as projectsLogic } from './logic/projectsLogic';

function App() {
  // 1️⃣ App‑level state
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);

  // 2️⃣ Load stored projects on first render
  useEffect(() => {
    projectsLogic.loadStorage();
    const loaded = projectsLogic.getProjects().projects;
    setProjects(loaded);
    setCurrentProject(loaded[0]);
  }, []);

  // 3️⃣ Handlers
  const handleSelectProject = (project) => {
    setCurrentProject(project);
  };

  const handleAddTask = (todo) => {
    projectsLogic.addTodoToProject(currentProject, todo);
    // refresh state
    setProjects([...projectsLogic.getProjects().projects]);
    setShowAddTask(false);
  };

  const handleDeleteTask = (todo) => {
    projectsLogic.removeTodo(currentProject, todo);
    setProjects([...projectsLogic.getProjects().projects]);
  };

  const handleEditTask = (todo) => {
    // you’ll implement edit flow in a bit…
  };

  const handleAddProject = ({ name }) => {
    const newProj = projectsLogic.makeProject(name);
    projectsLogic.updateProjects(newProj);
    setProjects([...projectsLogic.getProjects().projects]);
    setShowAddProject(false);
  };

  // 4️⃣ Render
  return (
    <div className="app-container">
      <Sidebar />
      <ProjectList
        projects={projects}
        current={currentProject}
        onSelect={handleSelectProject}
        onAddProject={() => setShowAddProject(true)}
      />
      <ProjectTitleBar
        name={currentProject?.name}
        onAddTask={() => setShowAddTask(true)}
      />
      <TodoList
        todos={currentProject?.myTodos || []}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />

      {showAddTask && (
        <AddTaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowAddTask(false)}
        />
      )}

      {showAddProject && (
        <AddProjectForm
          onSubmit={handleAddProject}
          onCancel={() => setShowAddProject(false)}
        />
      )}
    </div>
  );
}

export default App;
