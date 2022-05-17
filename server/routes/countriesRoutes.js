const express = require('express')
const CountriesController = require('../controllers/CountriesController')
const router = express.Router()

router.post('/validation', CountriesController.countryValidation)
router.get('/generate', CountriesController.generateRandomCountry)

module.exports = router