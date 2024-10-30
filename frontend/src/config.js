const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://mern-todo-lists.onrender.com/api'
  : 'http://localhost:3000/api';

export default API_URL; 