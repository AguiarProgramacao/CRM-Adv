const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.criarCliente = (data) => {
  const {
    nome,
    documento,
    email,
    telefone,
    data_nascimento,
    endereco,
    observacoes
  } = data;

  return prisma.cliente.create({
    data: {
      nome,
      documento,
      email,
      telefone,
      data_nascimento,
      rua: endereco.rua,
      numero: endereco.numero,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      estado: endereco.estado,
      cep: endereco.cep,
      observacoes
    }
  });
};


exports.listarClientes = () => prisma.cliente.findMany({
  include: {
    atendimentos: true,
    leads: {
      include: {
        etapa: true,
      },
    },
  },
});

exports.buscarClientePorId = (id) => prisma.cliente.findUnique({
  where: { id: Number(id) },
  include: { atendimentos: true, leads: true, processo: true }
});

exports.adicionarAtendimento = ({ clienteId, descricao, processoId }) =>
  prisma.atendimento.create({
    data: { clienteId, descricao, processoId }
  });

exports.atualizarLead = ({ clienteId, etapaId }) => {
  return prisma.lead.upsert({
    where: { clienteId },
    update: { etapaId },
    create: { clienteId, etapaId }
  });
};

exports.relatorioFunil = () => {
  return prisma.lead.groupBy({
    by: ['etapa'],
    _count: { etapa: true }
  });
};

exports.listarClientesAvancado = (filtros) => {
  return prisma.cliente.findMany({
    where: {
      nome: filtros.nome ? { contains: filtros.nome } : undefined,
      email: filtros.email ? { contains: filtros.email } : undefined,
      leads: filtros.etapa ? {
        some: { etapa: filtros.etapa }
      } : undefined,
      criadoEm: filtros.dataInicio || filtros.dataFim ? {
        gte: filtros.dataInicio ? new Date(filtros.dataInicio) : undefined,
        lte: filtros.dataFim ? new Date(filtros.dataFim) : undefined
      } : undefined
    },
    include: { leads: true, atendimentos: true }
  });
};

exports.atualizarCliente = (id, dadosAtualizados) => {
  return prisma.cliente.update({
    where: { id: parseInt(id) },
    data: {
      nome: dadosAtualizados.nome,
      email: dadosAtualizados.email,
      telefone: dadosAtualizados.telefone,
      documento: dadosAtualizados.documento,
      data_nascimento: dadosAtualizados.data_nascimento,
      observacoes: dadosAtualizados.observacoes,
      rua: dadosAtualizados.endereco?.rua,
      numero: dadosAtualizados.endereco?.numero,
      complemento: dadosAtualizados.endereco?.complemento,
      bairro: dadosAtualizados.endereco?.bairro,
      cidade: dadosAtualizados.endereco?.cidade,
      estado: dadosAtualizados.endereco?.estado,
      cep: dadosAtualizados.endereco?.cep,
    },
  });
};
