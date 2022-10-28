const express = require('express')
const CountriesController = require('../controllers/CountriesController')
const router = express.Router()

router.get('/test', CountriesController.startDb)
router.post('/validation', CountriesController.countryValidation)
router.get('/generate', CountriesController.generateRandomCountry)
//new methods
router.post('/set-countries', CountriesController.getCountriesFromDb)
router.get('/generate-country', CountriesController.generateNewCountry)
router.post('/validate-country', CountriesController.validateCountry)

module.exports = router