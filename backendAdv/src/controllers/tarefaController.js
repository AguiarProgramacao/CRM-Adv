const tarefaService = require('../services/tarefaService');

exports.createTarefa = async (req, res) => {
  try {
    const tarefa = await tarefaService.createTarefa(Number(req.params.id), req.body);
    res.status(201).json(tarefa);
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getTarefasByProcesso = async (req, res) => {
  try {
    const tarefas = await tarefaService.getTarefasByProcesso(Number(req.params.id));
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTarefa = async (req, res) => {
  try {
    const tarefa = await tarefaService.updateTarefa(Number(req.params.tarefaId), req.body);
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTarefa = async (req, res) => {
  try {
    await tarefaService.deleteTarefa(Number(req.params.tarefaId));
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllTarefas = async (req, res) => {
  try {
    const tarefas = await tarefaService.getAllTarefas(); // ✅ Usa o service
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
