import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Retrieve the username from localStorage
  const username = localStorage.getItem("username");

  // Logout function
  const handleLogout = () => {
    // Clear the token and username from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/"); // Redirect to home
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      <span>Welcome, {username}!</span>
      <button
        onClick={() => {
          navigate("/todos");
        }}
      >
        Go to your lists
      </button>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
