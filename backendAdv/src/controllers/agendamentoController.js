const agendamentoService = require('../services/agendamentoService');

exports.createAgendamento = async (req, res) => {
  try {
    const userId = 1;
    const agendamento = await agendamentoService.createAgendamento(userId, req.body);
    res.status(201).json(agendamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAgendamentos = async (req, res) => {
  try {
    const agendamentos = await agendamentoService.getAgendamentos();
    res.json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAgendamentoById = async (req, res) => {
  try {
    const agendamento = await agendamentoService.getAgendamentoById(Number(req.params.id));
    res.json(agendamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAgendamento = async (req, res) => {
  try {
    const userId = 1;
    const agendamento = await agendamentoService.updateAgendamento(userId, Number(req.params.id), req.body);
    res.json(agendamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAgendamento = async (req, res) => {
  try {
    const userId = 1;
    await agendamentoService.deleteAgendamento(userId, Number(req.params.id));
    res.json({ message: 'Agendamento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAgendamentoPublico = async (req, res) => {
  const { slug } = req.params;
  const { titulo, descricao, dataHoraInicio, dataHoraFim } = req.body;

  res.status(201).json({ message: 'Agendamento criado com sucesso' });
};
