import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("1. Starting registration attempt");
      setError("");
      const response = await axios.post(`${API_URL}/auth/register`, formData);

      console.log("2. Response received:", response.status);

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", formData.username);
        navigate("/todos");
      } else {
        setError(
          response.data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.log("3. Error caught:", {
        status: error.response?.status,
        message: error.response?.data?.message,
        error: error,
      });

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Registration failed. Please try again.");
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
        <button type="submit">Register</button>
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

export default Register;
