const mongoose = require('mongoose');

const TodoListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TodoItem' }],
});

module.exports = mongoose.model('TodoList', TodoListSchema);
