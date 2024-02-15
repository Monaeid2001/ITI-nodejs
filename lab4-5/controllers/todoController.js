const Todo = require('../models/todo');

exports.createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      userId: req.user._id,
      title: req.body.title,
      tags: req.body.tags
    });
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.editTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found.' });
    
    if (String(todo.userId) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Access denied. You are not authorized to edit this todo.' });
    }
    
    todo.set(req.body);
    await todo.save();
    
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found.' });
    
    if (String(todo.userId) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Access denied. You are not authorized to delete this todo.' });
    }
    
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getUserTodos = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (String(userId) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Access denied. You are not authorized to access this user\'s todos.' });
    }
    
    const todos = await Todo.find({ userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getFilteredTodos = async (req, res) => {
  const { limit = 10, skip = 0, status } = req.query;
  try {
    const todos = await Todo.find({ status }).limit(parseInt(limit)).skip(parseInt(skip));
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};
