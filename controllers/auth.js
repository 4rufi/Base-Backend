const express = require('express');
const user = require('../models/user');
const User = require('../models/user');
const { validatePass, generateJWT } = require('../helpers/crypto');

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
    console.log(validPassword);
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

module.exports = {
  login,
};
