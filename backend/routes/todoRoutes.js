const express = require('express');
const {
  createTodoList,
  getTodoLists,
  deleteTodoList,
  getTodoList,
} = require('../controllers/todoListController');
const {
  createTodoItem,
  deleteTodoItem,
  markItemAsDone,
  getTodoItem,
} = require('../controllers/todoItemController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Todo List routes
router.post('/', authMiddleware, createTodoList);
router.get('/', authMiddleware, getTodoLists);
router.get('/:id', authMiddleware,getTodoList )
router.delete('/:id', authMiddleware, deleteTodoList);

// Todo Item routes
router.post('/item', authMiddleware, createTodoItem);
router.get('/item/:id', authMiddleware, getTodoItem)
router.delete('/item/:id', authMiddleware, deleteTodoItem);
router.patch('/item/:id/mark', authMiddleware, markItemAsDone);

module.exports = router;
