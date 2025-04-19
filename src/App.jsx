import { useEffect, useState } from 'react';
import './index.css';

// components
import Sidebar from './components/Sidebar/Sidebar';
import ProjectTitleBar from './components/ProjectTitleBar/ProjectTitleBar';
import TodoList from './components/TodoList/TodoList';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import AddProjectForm from './components/AddProjectForm/AddProjectForm';

// logic layer
import { projects as projectsLogic } from './logic/projectsLogic';

function App() {
  /* ---------------- State ---------------- */
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);

  /* --------------- Effects --------------- */
  useEffect(() => {
    projectsLogic.initializeLocalStorage(); // ensure there is at least one project
    projectsLogic.loadStorage();
    const loaded = projectsLogic.getProjects().projects;
    setProjects(loaded);
    setCurrentProject(loaded[0] ?? null);
  }, []);

  /* --------------- Handlers -------------- */
  const handleSelectProject = (project) => setCurrentProject(project);

  const handleAddTask = (todo) => {
    if (!currentProject) return;
    projectsLogic.addTodoToProject(currentProject, todo);
    setProjects([...projectsLogic.getProjects().projects]);
    setShowAddTask(false);
  };

  const handleDeleteTask = (todo) => {
    if (!currentProject) return;
    projectsLogic.removeTodo(currentProject, todo);
    setProjects([...projectsLogic.getProjects().projects]);
  };

  const handleEditTask = (patchedTodo) => {
    // placeholder for future edit‑todo flow
  };

  const handleAddProject = ({ name }) => {
    const newProj = projectsLogic.makeProject(name);
    projectsLogic.updateProjects(newProj);
    setProjects([...projectsLogic.getProjects().projects]);
    setShowAddProject(false);
    setCurrentProject(newProj); // auto‑switch to new project
  };

  /* ---------------- View ----------------- */
  return (
    <div className="app-container">
      {/* Sidebar with nested project list */}
      <Sidebar
        projects={projects}
        current={currentProject}
        onSelect={handleSelectProject}
        onAddProject={() => setShowAddProject(true)}
      />

      {/* Top bar showing current project + Add Task btn */}
      {currentProject && (
        <ProjectTitleBar
          name={currentProject.name}
          onAddTask={() => setShowAddTask(true)}
        />
      )}

      {/* Todos for selected project */}
      <main className="main-body">
        <TodoList
          todos={currentProject?.myTodos || []}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </main>

      {/* Dialogs / Modals */}
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
