import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const TodoList = () => {
  const { id } = useParams(); // ID for the specific todo list
  const [todoList, setTodoList] = useState(null);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [itemsContent, setItemsContent] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchTodoList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      //   const newTodoList  =  response.data.map
      setTodoList(response.data);
      console.log("yooo");
    } catch (error) {
      console.error(error);
      navigate("/"); // Redirect to home on error
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/todos/item`,
        {
          todoListId: id, // Pass the list ID to identify the todo list
          content: newItemTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewItemTitle("");
      fetchTodoList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/todos/item/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTodoList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAsDone = async (itemId) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/todos/item/${itemId}/mark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTodoList();
    } catch (error) {
      console.error(error);
    }
  };

  if (!todoList) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <h1>{todoList.title}</h1>
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          placeholder="New Todo Item"
          required
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {todoList.items.map((item) => (
          <li key={item._id}>
            <span
              style={{
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              {item.content}
            </span>
            <button onClick={() => handleMarkAsDone(item._id)}>
              Mark as Done
            </button>
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
