const express = require('express');
const router = express.Router();
const controller = require('../controllers/financeiroController');

router.post('/transacao', controller.criarTransacao);
router.get('/transacoes', controller.listarTransacoes);
router.patch('/transacoes/:id/status', controller.atualizarStatus);

router.get('/relatorio', controller.gerarRelatorio);
router.get('/relatorio-financeiro', controller.relatorioFinanceiro);
router.get('/exportar', controller.exportarFinanceiro);

module.exports = router;