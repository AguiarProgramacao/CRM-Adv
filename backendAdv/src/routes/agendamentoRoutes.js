const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

router.post('/', agendamentoController.createAgendamento);
router.get('/', agendamentoController.getAgendamentos);
router.get('/:id', agendamentoController.getAgendamentoById);
router.put('/:id', agendamentoController.updateAgendamento);
router.delete('/:id', agendamentoController.deleteAgendamento);
router.post('/agendar/:slug', agendamentoController.createAgendamentoPublico);


module.exports = router;
