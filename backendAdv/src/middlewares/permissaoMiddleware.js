const jwt = require('jsonwebtoken');

exports.autorizar = (perfisPermitidos) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token ausente' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!perfisPermitidos.includes(decoded.perfil)) {
        return res.status(403).json({ error: 'Acesso negado' });
      }
      req.usuario = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Token inválido' });
    }
  };
};
