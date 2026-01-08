const express = require('express');
const router = express.Router();
const controller = require('../controllers/clienteController');

router.post('/', controller.criarCliente);
router.get('/:id', controller.buscarClientePorId);
router.get('/', controller.listarClientes);
router.put('/:id', controller.atualizarCliente);
router.post('/atendimento', controller.adicionarAtendimento);
router.post('/lead', controller.atualizarLead);
router.get('/relatorio/funil', controller.relatorioFunil);
router.get('/filtro/avancado', controller.listarClientesAvancado);

module.exports = router;
