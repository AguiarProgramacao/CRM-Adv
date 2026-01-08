const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const financeiroService = require('../services/financeiroService');
const relatorioService = require('../services/relatorioService');

exports.criarTransacao = async (req, res) => {
  try {
    const transacao = await financeiroService.criarTransacao(req.body);
    res.status(201).json(transacao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarTransacoes = async (req, res) => {
  try {
    const transacoes = await financeiroService.listarTransacoes();
    res.json(transacoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.gerarRelatorio = async (req, res) => {
  try {
    const relatorio = await financeiroService.gerarRelatorioFinanceiro(req.query);
    res.json(relatorio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.relatorioFinanceiro = async (req, res) => {
  try {
    const { status, clienteNome } = req.query;
    const filtro = {};
    if (status) filtro.status = status;
    if (clienteNome) filtro.clienteNome = { contains: clienteNome };

    const dados = await service.relatorioFinanceiro(filtro);
    res.json(dados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.exportarFinanceiro = async (req, res) => {
  try {
    const { tipo } = req.query;
    const filtro = {}; // podemos adicionar filtros aqui como status, data, etc
    const { cobrancas } = await financeiroService.relatorioFinanceiro(filtro);

    const campos = ['clienteNome', 'valor', 'descricao', 'status'];

    if (tipo === 'csv') {
      const csv = relatorioService.gerarCSV(cobrancas, campos);
      res.header('Content-Type', 'text/csv');
      res.attachment('relatorio_financeiro.csv');
      return res.send(csv);
    } else if (tipo === 'pdf') {
      const pdf = await relatorioService.gerarPDF(cobrancas, campos, 'Relatório Financeiro');
      res.header('Content-Type', 'application/pdf');
      res.attachment('relatorio_financeiro.pdf');
      return res.send(pdf);
    } else {
      res.status(400).json({ error: 'Tipo inválido (use csv ou pdf)' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const transacaoAtualizada = await prisma.transacao.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.json(transacaoAtualizada);
  } catch (err) {
    console.error("Erro ao atualizar status da transação:", err);
    res.status(500).json({ error: "Erro interno ao atualizar status" });
  }
};
