import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/todos'); // Redirect to todos page if user is logged in
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to Your Todo App!</h1>
      <p>This is a simple application to manage your todos.</p>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Home;
