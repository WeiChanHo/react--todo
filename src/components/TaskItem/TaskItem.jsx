import React from 'react';
// import './TaskItem.css';

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
    <div className="task-item">
      <div className="task-main">
        <h3 className="task-title">{todo.title}</h3>
        <p className="task-desc">{todo.description || 'No description'}</p>
      </div>

      <div className="task-meta">
        <p className="task-date">Due: {todo.dueDate}</p>
        <span
          className="task-priority"
          style={{ backgroundColor: priority.backgroundColor }}
        >
          {priority.label}
        </span>
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit(todo)} className="task-edit">✏️</button>
        <button onClick={() => onDelete(todo)} className="task-delete">🗑️</button>
      </div>
    </div>
  );
}

export default TaskItem;
