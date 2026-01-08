const express = require('express');
const router = express.Router();
const mensagemController = require('../controllers/mensagemController');

// POST /mensagem
router.post('/', mensagemController.receberMensagem);

module.exports = router;
