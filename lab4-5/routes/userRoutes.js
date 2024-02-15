const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getUserFirstName);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.editUser);

module.exports = router;
