const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getEtapas = async () => {
  return await prisma.etapaLead.findMany({
    orderBy: { ordem: 'asc' },
  });
};

exports.createEtapa = async ({ nome, ordem }) => {
  return await prisma.etapaLead.create({
    data: { nome, ordem },
  });
};

exports.updateEtapa = async (id, { nome, ordem }) => {
  return await prisma.etapaLead.update({
    where: { id },
    data: { nome, ordem },
  });
};

exports.deleteEtapa = async (id) => {
  return await prisma.etapaLead.delete({
    where: { id },
  });
};
