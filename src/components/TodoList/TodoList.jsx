import TaskItem from './TaskItem';

function TodoList({ todos, onDelete, onEdit }) {
  return (
    <div className="todo-list">
      {todos.map((todo, idx) => (
        <TaskItem key={idx} todo={todo} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}

export default TodoList;
