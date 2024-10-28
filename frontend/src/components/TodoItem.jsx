import React from 'react';
import axios from 'axios';

const TodoItem = ({ item, fetchTodoLists, todoListId }) => {
  const handleDeleteItem = async () => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:3000/api/todos/item/${item._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchTodoLists();
  };

  const handleMarkAsDone = async () => {
    const token = localStorage.getItem('token');
    await axios.patch(`http://localhost:3000/api/todos/item/${item._id}/mark`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchTodoLists();
  };

  return (
    <div>
      <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.content}</span>
      <button onClick={handleMarkAsDone}>Mark as Done</button>
      <button onClick={handleDeleteItem}>Delete</button>
    </div>
  );
};

export default TodoItem;
