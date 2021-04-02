const { response } = require('express');

const getUser = (req, res = response) => {
  // se utiliza para tomar parametros query example url/user?id=111&nombre=asjfhafjss
  const params = req.query;

  res.json({
    message: 'get API',
    params,
  });
};

const postUser = (req, res = response) => {
  const { nombre, edad } = req.body;
  res.json({
    message: 'post API',
    nombre,
    edad,
  });
};

const patchUser = (req, res = response) => {
  res.json({
    message: 'patch API',
  });
};

const deleteUser = (req, res = response) => {
  res.json({
    message: 'delete API',
  });
};

const putUser = (req, res = response) => {
  const { id } = req.params;

  res.json({
    message: 'put API',
    id,
  });
};

module.exports = {
  deleteUser,
  getUser,
  patchUser,
  postUser,
  putUser,
};
