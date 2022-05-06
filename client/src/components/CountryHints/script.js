import { Country } from './Country'

const countriesCapitals = require ('../../assets/json/country-by-capital-city.json') //city
const countriesContinent = require ('../../assets/json/country-by-continent.json') //continent
const countriesCostline = require ('../../assets/json/country-by-costline.json') //costline
const countriesCurrency = require ('../../assets/json/country-by-currency-name.json') //currency_name
const countriesDomain = require ('../../assets/json/country-by-domain-tld.json') //tld
const countriesElevation = require ('../../assets/json/country-by-elevation.json') //elevation
const countriesGovernment = require ('../../assets/json/country-by-government-type.json') //government
const countriesIndependence = require ('../../assets/json/country-by-independence-date.json') //independence
const countriesLandlocked = require ('../../assets/json/country-by-landlocked.json') //landlocked, returns 0 or 1
const countriesLanguages = require ('../../assets/json/country-by-languages.json') //languages, returns an array
const countriesLifeExpect = require ('../../assets/json/country-by-life-expectancy.json') //expectancy
const countriesPopulation = require ('../../assets/json/country-by-population.json') //population
const countriesReligion = require ('../../assets/json/country-by-religion.json') //religion
const countriesArea = require ('../../assets/json/country-by-surface-area.json') //area
const countriesAbbreviation = require ('../../assets/json/country-by-abbreviation.json') //abbreviation

const allData = [countriesContinent, countriesCostline, countriesCurrency, 
    countriesDomain, countriesElevation, countriesGovernment, countriesIndependence, countriesLandlocked,
    countriesLanguages, countriesLifeExpect, countriesPopulation, countriesReligion, countriesArea, countriesAbbreviation
]

export function getCountryData(index){
    const selectedCountry = JSON.stringify(countriesCapitals[index])
    const parseSelectedCountry = JSON.parse(selectedCountry)

    const country = parseSelectedCountry.country
    const capital = parseSelectedCountry.city

    const getData = dataFromCountry(parseSelectedCountry)
    const dataKeys = getData.map(obj => 
        obj === undefined ? {} :
        Object.keys(obj).filter(key=>key === null || key !== "country")
    )

    const countryObject = generateCountry(getData)
    countryObject.country = country
    countryObject.city = capital
    
    return countryObject
}

function dataFromCountry(countryObj){
    
    return allData.map(json => {
        const stringfiedData = JSON.stringify(json)
        const parseData = JSON.parse(stringfiedData)
        return parseData.find(country => country.country === countryObj.country)
    })
}

function generateCountry(countryArray){
    
    let currentCountry = countryArray.map(e =>{
        if(e===undefined){e=" "}
        return e
    })

    let countryObject = new Country() 
    
    countryObject.setContinent(currentCountry[0].continent || null)
    countryObject.setCostline(currentCountry[1].costline || null)
    countryObject.setCurrency(currentCountry[2].currency_name || null)
    countryObject.setDomain(currentCountry[3].tld || null)
    countryObject.setElevation(currentCountry[4].elevation || null)
    countryObject.setGovernment(currentCountry[5].government || null)
    countryObject.setIndependence(currentCountry[6].independence || null)
    countryObject.setLandlocked(currentCountry[7].landlocked || null)
    countryObject.setLanguages(currentCountry[8].languages || null)
    countryObject.setExpectancy(currentCountry[9].expectancy || null)
    countryObject.setPopulation(currentCountry[10].population || null)
    countryObject.setReligion(currentCountry[11].religion || null)
    countryObject.setArea(currentCountry[12].area || null)
    countryObject.setAbbreviation(currentCountry[13].abbreviation || null)
    
    return countryObject
}