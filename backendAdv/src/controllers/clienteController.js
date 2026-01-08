const service = require('../services/clienteService');

exports.criarCliente = async (req, res) => {
  try {
    const cliente = await service.criarCliente(req.body);
    res.status(201).json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarClientes = async (req, res) => {
  try {
    const clientes = await service.listarClientes();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.buscarClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await service.buscarClientePorId(id);

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.adicionarAtendimento = async (req, res) => {
  try {
    const atendimento = await service.adicionarAtendimento(req.body);
    res.status(201).json(atendimento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.atualizarLead = async (req, res) => {
  try {
    const lead = await service.atualizarLead(req.body);
    res.status(200).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.relatorioFunil = async (req, res) => {
  try {
    const dados = await service.relatorioFunil();
    res.json(dados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarClientesAvancado = async (req, res) => {
  try {
    const clientes = await service.listarClientesAvancado(req.query);
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.atualizarCliente = async (req, res) => {
  const { id } = req.params;
  const dadosAtualizados = req.body;

  try {
    const cliente = await service.atualizarCliente(id, dadosAtualizados);
    res.status(200).json(cliente);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
};