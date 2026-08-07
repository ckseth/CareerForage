const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'careerforge_jwt_super_secret_key_2026_safe', {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'careerforge_jwt_super_secret_key_2026_safe');
};

module.exports = {
  generateToken,
  verifyToken,
};
