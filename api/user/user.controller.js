const User = require('./user.model');

async function createUserHandler(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getUserByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  createUserHandler,
  getUserByIdHandler,
};
