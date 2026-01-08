const processoService = require('../services/processoService');

exports.createProcesso = async (req, res) => {
  try {
    console.log("Recebido no backend:", req.body);
    const processo = await processoService.createProcesso(req.body);
    res.status(201).json(processo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProcessos = async (req, res) => {
  try {
    const processos = await processoService.getAllProcessos();
    res.json(processos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProcessoById = async (req, res) => {
  try {
    const processo = await processoService.getProcessoById(Number(req.params.id));
    if (!processo) {
      return res.status(404).json({ error: 'Processo não encontrado' });
    }
    res.json(processo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProcesso = async (req, res) => {
  try {
    const processo = await processoService.updateProcesso(Number(req.params.id), req.body);
    res.json(processo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProcesso = async (req, res) => {
  try {
    await processoService.deleteProcesso(Number(req.params.id));
    res.json({ message: 'Processo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProcessoByClienteId = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const processo = await processoService.getProcessoByClienteId(clienteId);

    if (!processo) {
      return res.status(404).json({ error: 'Nenhum processo encontrado para este cliente' });
    }

    res.json(processo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
