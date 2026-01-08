const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcryptjs = require('bcryptjs');
const service = require('../services/authService');

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await prisma.user.findUnique({ where: { email } });
    if (!usuario) return res.status(401).json({ error: 'Usuário não encontrado' });

    const valido = await bcryptjs.compare(password, usuario.passwordHash);
    if (!valido) return res.status(401).json({ error: 'Senha inválida' });

    const token = service.gerarToken(usuario);
    res.json({
      token,
      user: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        whatsapp: usuario.whatsapp,
        empresa: usuario.empresa,
      }
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: 'Erro interno no login' });
  }
};

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password, whatsapp, empresa } = req.body;

  if (!name || !email || !password || !whatsapp || !empresa) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const existente = await prisma.user.findUnique({ where: { email } });
    if (existente) return res.status(409).json({ error: 'Email já está em uso' });

    const passwordHash = await bcryptjs.hash(password, 10);

    const novoUsuario = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        whatsapp,
        empresa,
      },
    });

    const token = service.gerarToken(novoUsuario);
    res.status(201).json({
      token,
      user: {
        id: novoUsuario.id,
        name: novoUsuario.name,
        email: novoUsuario.email,
        whatsapp: novoUsuario.whatsapp,
        empresa: novoUsuario.empresa,
      }
    });
  } catch (err) {
    console.error("Erro no registro:", err);
    res.status(500).json({ error: 'Erro interno no registro' });
  }
};
