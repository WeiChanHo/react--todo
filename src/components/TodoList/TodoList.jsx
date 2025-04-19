import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import './TodoList.css';

function TodoList({ todos, onDelete, onEdit }) {
  if (!todos || todos.length === 0) {
    return <div className="todo-list-empty">No tasks for this project.</div>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <TaskItem
          key={index}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TodoList;
