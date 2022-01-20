const { createUserHandler } = require('../../api/user/user.controller');
const { getUserByEmail } = require('../../api/user/user.service');
const { signToken } = require('../auth.service');

async function loginUserHandler(req, res) {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
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

async function forgotPassword() {}

async function singUpUser() {
  // primero crea el usuario
  //createUserHandler(req.body);
  // Correo de invitacion al usuario para que confirme su correo
}

module.exports = {
  loginUserHandler,
  forgotPassword,
};
