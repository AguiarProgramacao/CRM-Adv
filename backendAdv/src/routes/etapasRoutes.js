const express = require('express');
const router = express.Router();
const etapasLeadController = require('../controllers/etapasController');

router.get('/', etapasLeadController.getEtapas);
router.post('/', etapasLeadController.createEtapa);
router.put('/:id', etapasLeadController.updateEtapa);
router.delete('/:id', etapasLeadController.deleteEtapa);

module.exports = router;
