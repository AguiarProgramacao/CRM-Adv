const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

exports.criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, perfil } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = await prisma.usuario.create({
      data: { nome, email, senhaHash, perfil }
    });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};