const express = require('express')
const DifficultyController = require('../controllers/DifficultyController')
const router = express.Router()

router.get('/update-tables', DifficultyController.updateDifficultyTable)

module.exports = router