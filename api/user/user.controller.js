const User = require('./user.model');
const { signToken } = require('../../auth/auth.service');
const { main, sendEmail } = require('../../utils/email');
const { urlencoded } = require('express');
const crypto = require('crypto');

async function createUserHandler(req, res) {
  console.log('entro aqui');
  const newUser = req.body;
  try {
    const hash = crypto
      .createHash('sha256')
      .update(newUser.email)
      .digest('hex');

    console.log(hash);
    newUser.passwordResetToken = hash;
    newUser.passwordResetExpires = Date.now() + 3600000 * 24; // Expira en 24h
    const user = await User.create(newUser);

    const email = {
      to: user.email,
      subject: 'Activate your account',
      template_id: 'd-7f1ed07a54f24fc1aa0cec826b1aa79b',
      dynamic_template_data: {
        firstName: user.firstName,
        url: `http://localhost:3000/activate/${user.passwordResetToken}`,
      },
    };

    sendEmail(email);

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
