const mysql = require('mysql')

const countriesJSON = require('../assets/json/countries.json')
const continentsJSON = require('../assets/json/country-by-continent.json')
const costlineJSON = require('../assets/json/country-by-costline.json')
const currencyJSON = require('../assets/json/country-by-currency-name.json')

function generateCountries(){
    let currentCountry = {}
    
    const countriesArr = Array.from(countriesJSON)
    const continentsArr = Array.from(continentsJSON)
    const costlineArr = Array.from(costlineJSON)

    currentCountry.country = countriesArr[0].name
    currentCountry.capital = countriesArr[0].capital
    const regex = new RegExp(currentCountry.country)

    currentCountry.continent = continentsArr.find(e => {
        if(e.name===currentCountry.name)
            return e
    }).continent
    currentCountry.costline = costlineArr.map(e => {
        if(e.country.match('/^'+currentCountry.country+'$/')){
            console.log(e.costline)
            return e
        }  
    }).costline

    console.log(currentCountry)
}

generateCountries()