const jwt = require('jsonwebtoken');

exports.gerarToken = (usuario) => {
  return jwt.sign({
    id: usuario.id,
    name: usuario.nome,
    email: usuario.email
  }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.validarToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
