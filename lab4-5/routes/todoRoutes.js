const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authenticateUser = require('../middleware/authenticateUser');

router.post('/', authenticateUser, todoController.createTodo);
router.patch('/:id', authenticateUser, todoController.editTodo);
router.delete('/:id', authenticateUser, todoController.deleteTodo);
router.get('/:userId/todos', authenticateUser, todoController.getUserTodos);
router.get('/', authenticateUser, todoController.getFilteredTodos);

module.exports = router;
