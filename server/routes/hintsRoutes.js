const express = require('express')
const HintsController = require('../controllers/HintsController')
const router = express.Router()

router.get('/generate', HintsController.generateNewHint)
router.get('/clear', HintsController.clearHints)

module.exports = router