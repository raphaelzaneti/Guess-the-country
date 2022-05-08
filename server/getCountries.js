const countries = "/assets/json/countries.json"
const path = require('path')
const fs = require('fs')

const CountryController = require('./controllers/CountryController')

module.exports = function getCountries(name){
    const countriesList = path.join(__dirname, countries)
    const rawFile = fs.readFileSync(countriesList)
    const readble = JSON.parse(rawFile)

    const country = setCountryData(name, readble)

//    console.log()
    return Array.from(readble).find(e => e.name === name)
}

function setCountryData(name){
    const randomCountry = new CountryController()

    const countryFound = Array.from(readble).find(e => e.name === name)

    randomCountry.setCountry(jsonCountry.name)
    randomCountry.setCapital(jsonCountry.capital)
    randomCountry.setContinent(jsonCountry.continent)

    console.log('country setted: ', randomCountry)
}