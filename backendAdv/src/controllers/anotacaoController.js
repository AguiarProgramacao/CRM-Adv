const anotacaoService = require('../services/anotacaoService');

exports.createAnotacao = async (req, res) => {
  try {
    const anotacao = await anotacaoService.createAnotacao(Number(req.params.id), req.body);
    res.status(201).json(anotacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnotacoesByProcesso = async (req, res) => {
  try {
    const anotacoes = await anotacaoService.getAnotacoesByProcesso(Number(req.params.id));
    res.json(anotacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAnotacao = async (req, res) => {
  try {
    const anotacao = await anotacaoService.updateAnotacao(Number(req.params.anotacaoId), req.body);
    res.json(anotacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAnotacao = async (req, res) => {
  try {
    await anotacaoService.deleteAnotacao(Number(req.params.anotacaoId));
    res.json({ message: 'Anotação deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
