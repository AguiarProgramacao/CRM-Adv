exports.autorizar = (perfisPermitidos = []) => {
  return (req, res, next) => {
    const { user } = req;

    if (!user?.perfil) {
      return res.status(403).json({ error: "Perfil não definido" });
    }

    if (!perfisPermitidos.includes(user.perfil)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    next();
  };
};
