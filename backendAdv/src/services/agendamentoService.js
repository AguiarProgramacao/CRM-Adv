const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const googleService = require('./googleService');

exports.createAgendamento = async (userId, data) => {
  const agendamento = await prisma.agendamento.create({
    data: {
      titulo: data.titulo,
      descricao: data.descricao,
      dataHoraInicio: new Date(data.dataHoraInicio),
      tipo: data.tipo,
      processoId: data.processoId,
      email: data.email,
      nome: data.nome
    }
  });

  // Cria o evento no Google Calendar
  try {
    const googleEventId = await googleService.createGoogleEvent(userId, agendamento);

    // Atualiza o agendamento com o ID do evento do Google
    await prisma.agendamento.update({
      where: { id: agendamento.id },
      data: { googleEventId }
    });

    return { ...agendamento, googleEventId };
  } catch (error) {
    console.error("Erro ao criar evento no Google Calendar:", error.message);
    return agendamento; // retorna mesmo se o Google Calendar falhar
  }
};

exports.getAgendamentos = async () => {
  return prisma.agendamento.findMany({
    orderBy: { dataHoraInicio: 'asc' }
  });
};

exports.getAgendamentoById = async (id) => {
  return prisma.agendamento.findUnique({ where: { id } });
};

exports.updateAgendamento = async (userId, id, data) => {
  const agendamento = await prisma.agendamento.update({
    where: { id },
    data: {
      titulo: data.titulo,
      descricao: data.descricao,
      dataHoraInicio: new Date(data.dataHoraInicio),
      dataHoraFim: new Date(data.dataHoraFim),
      tipo: data.tipo
    }
  });

  if (agendamento.googleEventId) {
    await googleService.updateGoogleEvent(userId, agendamento.googleEventId, agendamento);
  }

  return agendamento;
};

exports.deleteAgendamento = async (userId, id) => {
  const agendamento = await prisma.agendamento.findUnique({ where: { id } });
  if (agendamento.googleEventId) {
    await googleService.deleteGoogleEvent(userId, agendamento.googleEventId);
  }
  return prisma.agendamento.delete({ where: { id } });
};