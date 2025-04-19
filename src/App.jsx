// src/App.jsx
import { useEffect, useState } from 'react';
import './index.css';

import Sidebar        from './components/Sidebar/Sidebar';
import TodoList       from './components/TodoList/TodoList';
import AddTaskForm    from './components/AddTaskForm/AddTaskForm';
import AddProjectForm from './components/AddProjectForm/AddProjectForm';

// logic layer exports
import {
  projects as projectsLogic,
  makeProject,
  makeTodo,
  addTodoToProject,
  removeTodo,
  updateTodo
} from './logic/projectsLogic';

function App() {
  /* ──────────────── State ──────────────── */
  const [projects, setProjects]             = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [showAddTask, setShowAddTask]       = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [editingTodo, setEditingTodo]       = useState(null);

  /* ─────────────── useEffect ───────────── */
  useEffect(() => {
    projectsLogic.initializeLocalStorage();
    projectsLogic.loadStorage();
    const loaded = projectsLogic.getProjects().projects;
    setProjects(loaded);
    setCurrentProject(loaded[0] ?? null);
  }, []);

  /* ──────────── Helper: refresh ────────── */
  const refresh = () => {
    setProjects([...projectsLogic.getProjects().projects]);
    setCurrentProject(prev =>
      projectsLogic.getProjects().projects.find(p => p.name === prev?.name) ??
      projectsLogic.getProjects().projects[0] ??
      null
    );
  };

  /* ─────────────── Handlers ────────────── */
  const handleSelectProject = p => setCurrentProject(p);

  const handleAddTask = ({ title, description, dueDate, priority }) => {
    if (!currentProject) return;

    if (editingTodo) {
      // Edit flow
      const upd = updateTodo(editingTodo);
      upd.changeTodoTitle(title);
      upd.changeTodoDescription(description);
      upd.changeTodoDueDate(dueDate);
      upd.changeTodoPriority(priority);
      setEditingTodo(null);
    } else {
      // New flow
      const todo = makeTodo(title, description, dueDate, priority);
      addTodoToProject(currentProject, todo);
    }

    projectsLogic.populateStorage();
    refresh();
    setShowAddTask(false);
  };

  const handleDeleteTask = todo => {
    if (!currentProject) return;
    removeTodo(currentProject, todo);
    projectsLogic.populateStorage();
    refresh();
  };

  const handleEditTask = todo => {
    setEditingTodo(todo);
    setShowAddTask(true);
  };

  const handleAddProject = ({ name }) => {
    const newProj = makeProject(name);
    projectsLogic.updateProjects(newProj);
    projectsLogic.populateStorage();
    refresh();
    setCurrentProject(newProj);
    setShowAddProject(false);
  };

  /* ───────────────── View ───────────────── */
  return (
    <div className="app-container">
      {/* Sidebar = nav + buttons */}
      <Sidebar
        projects={projects}
        current={currentProject}
        onSelect={handleSelectProject}
        onAddProject={() => setShowAddProject(true)}
        onAddTask={() => setShowAddTask(true)}
      />

      {/* Task list for selected project */}
      <main className="main-body">
        <TodoList
          todos={currentProject?.myTodos || []}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </main>

      {/* Dialogs */}
      {showAddTask && (
        <AddTaskForm
          initialData={editingTodo}
          onSubmit={handleAddTask}
          onCancel={() => {
            setShowAddTask(false);
            setEditingTodo(null);
          }}
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
