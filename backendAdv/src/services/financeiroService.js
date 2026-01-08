const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.criarHonorario = async (data) => {
  return prisma.honorario.create({ data });
};

exports.criarTransacao = async (data) => {
  return prisma.transacao.create({ data });
}

exports.criarConta = async (data) => {
  return prisma.conta.create({ data });
};

exports.listarHonorariosPorProcesso = async (processoId) => {
  return prisma.honorario.findMany({ where: { processoId } });
};

exports.listarTransacoes = () => {
  return prisma.transacao.findMany({
    include: {
      cliente: true,
      processo: true,
    },
    orderBy: {
      dataTransacao: 'desc',
    }
  });
};

exports.listarContas = async (filtros) => {
  return prisma.conta.findMany({
    where: {
      tipo: filtros.tipo || undefined,
      status: filtros.status || undefined,
      dataVencimento: filtros.dataVencimento ? { gte: new Date(filtros.dataVencimento) } : undefined
    }
  });
};

exports.gerarRelatorioFinanceiro = async ({ tipo, clienteId, dataInicio, dataFim }) => {
  return prisma.honorario.findMany({
    where: {
      processo: clienteId ? { partes: { some: { id: clienteId } } } : undefined,
      dataVencimento: {
        gte: dataInicio ? new Date(dataInicio) : undefined,
        lte: dataFim ? new Date(dataFim) : undefined
      }
    },
    include: { processo: true }
  });
};

exports.relatorioFinanceiro = async (filtro = {}) => {
  const cobrancas = await prisma.cobranca.findMany({
    where: filtro
  });

  const total = cobrancas.reduce((acc, c) => acc + c.valor, 0);
  return { total, cobrancas };
};

exports.atualizarStatus = (id, status) => {
  return prisma.transacao.update({
    where: { id: parseInt(id) },
    data: { status },
  });
};
