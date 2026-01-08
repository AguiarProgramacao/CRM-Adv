const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const register = async ({ name, email, whatsapp, empresa, password }) => {
  if (!name || !email || !whatsapp || !empresa || !password) {
    throw new Error('Todos os campos são obrigatórios');
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Usuário já existe com este email');

  const hashedPassword = await bcrypt.hash(password, 10);

  const novoUsuario = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      whatsapp,
      empresa
    }
  });

  return novoUsuario;
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Usuário não encontrado');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Senha incorreta');

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return { token, user };
};

module.exports = {
  register,
  login,
};
