const router = require('express').Router();
const controller = require('../controllers/usuarioController');

router.post('/', controller.criarUsuario);
router.get('/', controller.getAllUsuarios);

module.exports = router;
