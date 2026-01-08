const { PrismaClient } = require('@prisma/client');
const { options } = require('pdfkit');
const prisma = new PrismaClient();

exports.createProcesso = async (data) => {
  return prisma.processo.create({
    data: {
      numero: data.numero,
      tribunal: data.tribunal || "",
      andamento: data.andamento || "Ativo",
      areaJuridica: data.areaJuridica || null,
      responsavelId: data.responsavelId || null,
      clienteId: data.clienteId || null,
      autor: data.autor || null,
      reu: data.reu || null,
      valor: data.valor ? Number(data.valor) : null,
      descricao: data.descricao || null,
    },
  });
};

exports.getAllProcessos = async () => {
  return prisma.processo.findMany({
    include: {
      responsavel: true,
      cliente: true
    }
  });
};

exports.getProcessoById = async (id) => {
  return prisma.processo.findUnique({
    where: { id: Number(id) },
    include: {
      responsavel: true,
      cliente: true,
      tarefas: true
    }
  });
};

exports.updateProcesso = async (id, data) => {
  return prisma.processo.update({
    where: { id },
    data: {
      numero: data.numero,
      tribunal: data.tribunal || "",
      andamento: data.andamento || "Ativo",
      areaJuridica: data.areaJuridica || null,
      responsavelId: data.responsavelId || null,
      clienteId: data.clienteId || null,
      autor: data.autor || null,
      reu: data.reu || null,
      valor: data.valor ? Number(data.valor) : null,
      descricao: data.descricao || null,
    },
  });
};

exports.deleteProcesso = async (id) => {
  return prisma.processo.delete({
    where: { id }
  });
};

exports.getProcessoByClienteId = async (clienteId) => {
  return prisma.processo.findFirst({
    where: { clienteId: Number(clienteId) }
  });
};
