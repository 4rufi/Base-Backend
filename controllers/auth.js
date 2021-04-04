const express = require('express');
const { User } = require('../models');
const { validatePass, generateJWT } = require('../helpers/crypto');
const { googleVerify } = require('../helpers/verifyGoogle');
const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'User or Password incorrect' });

    //Verificar si el usuario esta activo
    if (!user.state)
      return res.status(400).json({ message: 'User or Password incorrect' });

    // Verificar la contraseña
    const validPassword = validatePass(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ message: 'User or Password incorrect - password' });

    // Generar el JWT
    const token = await generateJWT(user.id);
    res.json({ user, token: token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Server Error, contact to administrator' });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { email, name, img } = await googleVerify(id_token);
    let user = await User.findOne({ email });
    if (!user) {
      const data = {
        name,
        email,
        password: ':P',
        img,
        google: true,
      };
      user = new User(data);
      await user.save();
    } else {
      const data = {
        name,
        email,
        google: true,
        img,
      };
      await User.findByIdAndUpdate(user.id, data);
    }

    if (!user.state)
      return res.status(401).json({ message: 'User blocked, contact admin' });

    const token = await generateJWT(user.id);
    res.json({
      message: 'google',
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Google Token not valid' });
  }
};

module.exports = {
  login,
  googleSignIn,
};
