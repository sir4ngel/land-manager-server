const { Router } = require('express');
const { getLands, createLand, deleteLand } = require('../controllers/lands.controller')

const router = Router();

router.get('/lands', getLands);

router.post('/lands', createLand);

router.delete('/lands/:id', deleteLand);

module.exports = router;