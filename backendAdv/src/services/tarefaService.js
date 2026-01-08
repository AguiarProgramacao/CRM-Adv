const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createTarefa = async (processoId, data) => {
  return prisma.tarefa.create({
    data: {
      titulo: data.titulo,
      descricao: data.descricao,
      status: data.status || 'pendente',
      responsavelId: data.responsavelId || null,
      processoId,
      dataVencimento: data.dataVencimento || null,
      prioridade: data.prioridade || 'media',
      tipo: data.tipo || 'documento'
    }
  });
};

exports.getTarefasByProcesso = async (processoId) => {
  return prisma.tarefa.findMany({
    where: { processoId },
    include: {
      responsavel: true,
    },
    orderBy: { criadoEm: 'desc' }
  });
};

exports.updateTarefa = async (id, data) => {
  try {
    console.log("Recebido no updateTarefa:", id, data);

    if ('responsavelId' in data) {
      data.responsavelId = data.responsavelId ? Number(data.responsavelId) : null;
    }

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id },
      data
    });

    return tarefaAtualizada;
  } catch (err) {
    console.error("Erro no updateTarefa:", err);
    throw err;
  }
};


exports.deleteTarefa = async (id) => {
  return prisma.tarefa.delete({
    where: { id }
  });
};

exports.getAllTarefas = async () => {
  return prisma.tarefa.findMany({
    include: {
      responsavel: true,
      processo: {
        include: {
          cliente: true
        }
      }
    },
    orderBy: { criadoEm: 'desc' }
  });
};
