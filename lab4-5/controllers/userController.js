const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob
    });
    await user.save();
    const token = jwt.sign({ _id: user._id }, 'gehfvhbvjduv');
    res.json({ user, token });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(401).json({ message: 'Invalid username or password.' });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid username or password.' });

  const token = jwt.sign({ _id: user._id }, 'gehfvhbvjduv');
  res.json({ user, token });
};

exports.getUserFirstName = async (req, res) => {
  try {
    const users = await User.find().select('firstName');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.editUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'User was edited successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};
