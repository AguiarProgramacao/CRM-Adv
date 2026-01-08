const timelineService = require('../services/timelineService');

exports.createEvento = async (req, res) => {
  try {
    const evento = await timelineService.createEvento(Number(req.params.id), req.body);
    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEventosByProcesso = async (req, res) => {
  try {
    const eventos = await timelineService.getEventosByProcesso(Number(req.params.id));
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEvento = async (req, res) => {
  try {
    const evento = await timelineService.updateEvento(Number(req.params.eventoId), req.body);
    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEvento = async (req, res) => {
  try {
    await timelineService.deleteEvento(Number(req.params.eventoId));
    res.json({ message: 'Evento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
