const router = require('express').Router();
const controller = require('../controllers/emailController');

router.post('/enviar', controller.enviar);

module.exports = router;
