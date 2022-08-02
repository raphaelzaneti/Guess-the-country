const express = require('express')
const CountriesController = require('../controllers/CountriesController')
const router = express.Router()

router.get('/test', CountriesController.startDb)
router.post('/validation', CountriesController.countryValidation)
router.get('/generate', CountriesController.generateRandomCountry)

module.exports = router