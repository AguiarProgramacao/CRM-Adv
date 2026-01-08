const router = require('express').Router();
const controller = require('../controllers/whatsappController');

router.post('/', controller.receberMensagem); 
router.get('/', controller.listarMensagens);
router.post('/enviar', controller.enviarMensagem);

module.exports = router;
