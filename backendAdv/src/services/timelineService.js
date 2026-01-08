const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createEvento = async (processoId, data) => {
  return prisma.timeline.create({
    data: {
      descricao: data.descricao,
      data: new Date(data.data),
      tipo: data.tipo,
      prazo: data.prazo ? new Date(data.prazo) : null,
      processoId
    }
  });
};

exports.getEventosByProcesso = async (processoId) => {
  return prisma.timeline.findMany({
    where: { processoId },
    orderBy: { data: 'asc' }
  });
};

exports.updateEvento = async (id, data) => {
  return prisma.timeline.update({
    where: { id },
    data: {
      descricao: data.descricao,
      data: new Date(data.data),
      tipo: data.tipo,
      prazo: data.prazo ? new Date(data.prazo) : null
    }
  });
};

exports.deleteEvento = async (id) => {
  return prisma.timeline.delete({
    where: { id }
  });
};
