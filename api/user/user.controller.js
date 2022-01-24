const User = require('./user.model');
const { signToken } = require('../../auth/auth.service');
const { main, sendEmail } = require('../../utils/email');
const { urlencoded } = require('express');

async function createUserHandler(req, res) {
  try {
    const user = await User.create(req.body);

    // primero creamos el pdf ./temp
    main(req.body);
    sendEmail({ template_id: '', dynamic_template_data: req.body });
    // Eliminamos el pdf.

    //opcion 2
    //crea un ruta para pdf
    // servidor remoto.
    // url y filename
    User.update(url);

    //enviamos el correo
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
