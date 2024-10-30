import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import API_URL from "../config";

const TodoPage = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodoLists = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTodoLists(response.data);
  };

  const handleCreateList = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      `${API_URL}/todos`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTitle("");
    fetchTodoLists();
  };

  useEffect(() => {
    fetchTodoLists();
  }, []);

  return (
    <div>
      <Header />
      <h1>Todo Lists</h1>
      <form onSubmit={handleCreateList}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder=" New List Title"
          required
        />
        <button type="submit">Create Todo List</button>
      </form>
      <div>
        <ol>
          {todoLists.map((list) => (
            <li key={list._id}>
              <Link to={`/todos/${list._id}`}>{list.title}</Link>
            </li>
          ))}
        </ol>
      </div>
      {/* {todoLists.map((list) => (
        <TodoList key={list._id} list={list} fetchTodoLists={fetchTodoLists} />
      ))} */}
    </div>
  );
};

export default TodoPage;
