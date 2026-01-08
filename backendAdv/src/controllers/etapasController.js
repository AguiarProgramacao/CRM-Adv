const etapaLeadService = require('../services/etapasService');

exports.getEtapas = async (req, res) => {
  try {
    const etapas = await etapaLeadService.getEtapas();
    res.json(etapas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEtapa = async (req, res) => {
  try {
    const { nome, ordem } = req.body;
    const etapa = await etapaLeadService.createEtapa({ nome, ordem });
    res.status(201).json(etapa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEtapa = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nome, ordem } = req.body;
    const etapa = await etapaLeadService.updateEtapa(id, { nome, ordem });
    res.json(etapa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEtapa = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await etapaLeadService.deleteEtapa(id);
    res.json({ message: 'Etapa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
