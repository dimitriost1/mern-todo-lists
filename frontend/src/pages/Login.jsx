import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", formData.username);
      navigate("/todos");
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            setError("Username not found. Please check your username.");
            break;
          case 401:
            setError("Incorrect password. Please try again.");
            break;
          default:
            setError("Login failed. Please try again.");
        }
      } else if (error.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && (
        <div
          style={{
            color: "red",
            marginTop: "1rem",
            textAlign: "center",
            fontSize: "0.9rem",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default Login;
