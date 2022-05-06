const countries = "/assets/json/countries.json"
const path = require('path')
const fs = require('fs')

module.exports = function getCountries(name){
    const countriesList = path.join(__dirname, countries)
    const rawFile = fs.readFileSync(countriesList)
    const readble = JSON.parse(rawFile)

    console.log(Array.from(readble).find(e => e.name === name))
    return Array.from(readble).find(e => e.name === name)
}

//getCountries()