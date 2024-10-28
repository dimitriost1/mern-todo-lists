const TodoList = require('../models/TodoList');
// const TodoItem = require('../models/TodoItem');

// Create a new todo list
exports.createTodoList = async (req, res) => {
  try {
    const { title } = req.body;
    const todoList = new TodoList({ title, user: req.userId });
    await todoList.save();
    res.status(201).json(todoList);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all todo lists for a user
exports.getTodoLists = async (req, res) => {
  try {
    const todoLists = await TodoList.find({ user: req.userId }).populate('items');
    res.status(200).json(todoLists);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a todo list
exports.getTodoList = async (req, res) => {
  try {
    const { id } = req.params;
    const todoList = await TodoList.findById(id).populate('items').exec();
    res.status(200).json(todoList);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a todo list
exports.deleteTodoList = async (req, res) => {
  try {
    const { id } = req.params;
    await TodoList.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
