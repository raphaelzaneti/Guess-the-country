const express = require('express')
const RulesController = require('../controllers/RulesController')
const router = express.Router()

router.get('/read', RulesController.readRules)

module.exports = router