const { createUserHandler } = require('../../api/user/user.controller');
const { getUserByEmail, findOneUser } = require('../../api/user/user.service');
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

async function verifyAccount(req, res, next) {
  const { hash } = req.body;
  try {
    const user = await findOneUser({ passwordResetToken: hash });
    if (!user) {
      return res.status(404).json({
        message: 'Invalid token',
      });
    }

    if (Date.now() > user.passwordResetExpires) {
      // borrar el usuario
      // generar un nuevo hash y enviar un nuevo correo
      return res.status(404).json({
        message: 'Token expired',
      });
    }

    user.active = true;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    await user.save(next);
    const token = signToken(user.profile);

    return res.status(200).json({
      message: 'Account verified!!!!',
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
}

module.exports = {
  loginUserHandler,
  forgotPassword,
  verifyAccount,
};
