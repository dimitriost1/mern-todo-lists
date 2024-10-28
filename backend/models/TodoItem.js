const mongoose = require('mongoose');

const TodoItemSchema = new mongoose.Schema({
  content: { type: String, required: true },
  completed: { type: Boolean, default: false },
  todoList: { type: mongoose.Schema.Types.ObjectId, ref: 'TodoList', required: true },
});

module.exports = mongoose.model('TodoItem', TodoItemSchema);
