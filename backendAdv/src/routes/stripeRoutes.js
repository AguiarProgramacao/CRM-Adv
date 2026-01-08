const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');

router.post('/gerar-boleto', stripeController.gerarBoleto);
router.get('/boletos', stripeController.listarBoletos);
router.patch('/boletos/:id', stripeController.atualizarStatusBoleto);

module.exports = router;
