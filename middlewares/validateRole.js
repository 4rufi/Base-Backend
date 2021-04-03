const { response } = require('express');

const isAdminRole = (req, res = response, next) => {
  if (!req.user)
    return res
      .status(500)
      .json({ message: 'error to get role without validate token' });
  const { role, name } = req.user;
  if (role !== 'ADMIN_ROLE')
    return res.status(401).json({ message: 'Unauthorized' });

  next();
};

const validateRoles = (...roles) => {
  return (req, res = response, next) => {
    const { role } = req.user;
    const includeRole = roles.includes(role);
    if (!includeRole) return res.status(401).json({ message: 'Unauthorized' });
    next();
  };
};

module.exports = {
  isAdminRole,
  validateRoles,
};
