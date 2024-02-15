const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true, minlength: 5, maxlength: 20 },
  status: { type: String, default: 'to-do', enum: ['to-do', 'in progress', 'done'] },
  tags: [{ type: String, maxlength: 10 }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', todoSchema);
