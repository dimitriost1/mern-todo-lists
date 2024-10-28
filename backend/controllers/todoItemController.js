const TodoItem = require('../models/TodoItem');
const TodoList = require('../models/TodoList');

// Create a new todo item
exports.createTodoItem = async (req, res) => {
  try {
    const { content, todoListId } = req.body;
    const todoItem = new TodoItem({ content, todoList: todoListId });
    await todoItem.save();

    // Add the item to the corresponding todo list
    await TodoList.findByIdAndUpdate(todoListId, { $push: { items: todoItem._id } });

    res.status(201).json(todoItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Get a todo item
exports.getTodoItem = async (req, res) => {
  try {
    const { id } = req.params;
    const todoItem = await TodoItem.findById(id);
    res.status(200).json(todoItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a todo item
exports.deleteTodoItem = async (req, res) => {
  try {
    const { id } = req.params;
    await TodoItem.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Mark a todo item as done
exports.markItemAsDone = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await TodoItem.findByIdAndUpdate(id, { completed: true }, { new: true });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
