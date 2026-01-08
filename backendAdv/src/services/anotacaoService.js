const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createAnotacao = async (processoId, data) => {
  return prisma.anotacao.create({
    data: {
      conteudo: data.conteudo,
      processoId
    }
  });
};

exports.getAnotacoesByProcesso = async (processoId) => {
  return prisma.anotacao.findMany({
    where: { processoId },
    orderBy: { criadoEm: 'desc' }
  });
};

exports.updateAnotacao = async (id, data) => {
  return prisma.anotacao.update({
    where: { id },
    data: {
      conteudo: data.conteudo
    }
  });
};

exports.deleteAnotacao = async (id) => {
  return prisma.anotacao.delete({
    where: { id }
  });
};
