import React from 'react';
import './TaskItem.css';

function TaskItem({ todo, onDelete, onEdit }) {
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case '1': return { backgroundColor: '#ff5d5d', label: 'Priority 1 (🔥 Highest)' };
      case '2': return { backgroundColor: 'yellow', label: 'Priority 2 (⚠️ High)' };
      case '3': return { backgroundColor: 'lightgreen', label: 'Priority 3 (👌 Medium)' };
      case '4': return { backgroundColor: 'lightgray', label: 'Priority 4 (😴 Lowest)' };
      default: return { backgroundColor: 'gray', label: 'Unknown' };
    }
  };

  const priority = getPriorityStyle(todo.priority);

  return (
    <div className="todo-container">
      <input type="checkbox" className="complete-todo" />
      <h3 className="todo-title">{todo.title}</h3>
      <p className="todo-desc">{todo.description || 'No description'}</p>
      
      <div className="todo-container-date-pri">
        <p className="todo-date">Due: {todo.dueDate}</p>
        <span
          className="todo-priority"
          style={{ backgroundColor: priority.backgroundColor }}
        >
          {priority.label}
        </span>
      </div>

      <button onClick={() => onEdit(todo)} className="edit-todo">✏️</button>
      <button onClick={() => onDelete(todo)} className="delete-todo">🗑️</button>
    </div>
  );
}

export default TaskItem;