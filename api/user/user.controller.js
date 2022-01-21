const User = require('./user.model');
const { signToken } = require('../../auth/auth.service');
const { uploadSingleHandler } = require('../upload/upload.controller');

async function createUserHandler(req, res) {
  const { cloudinaryImage } = req;
  try {
    const user = await User.create({
      ...req.body,
      imageUrl: cloudinaryImage.url,
    });

    // cloudinary
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

async function loginUserHandler(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }
    const isMatch = await user.comparePassword(password);
    // console.log('isMatch', isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid Password',
      });
    }

    const token = signToken(user.profile);
    return res.status(200).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

// create user

module.exports = {
  createUserHandler,
  getUserByIdHandler,
  loginUserHandler,
};
