let generatedCountries = []
let countriesCounter = 0

function fillGeneratedCountires(arr){
    generatedCountries = arr.map(e => Object(JSON.parse(JSON.stringify(e))))
}

function getAllGeneratedCountries(){
    return generatedCountries
}

function getCurrentCountry(){
    if(checkCountriesCounter()){
        return null    
    } else{
        return generatedCountries[countriesCounter]
    }
}

async function updateAnsweredCountry(obj, result){
    generatedCountries[countriesCounter].hints = await obj
    generatedCountries[countriesCounter].result = await result
    countriesCounter++
    return
}

function checkCountriesCounter(){
    if(Array.isArray(generatedCountries)){
        return countriesCounter === generatedCountries.length ? true : false
    } else{
        return false
    }
}

function clearCountriesCounter(){
    countriesCounter = 0
}

module.exports = {fillGeneratedCountires, getAllGeneratedCountries, getCurrentCountry, 
    updateAnsweredCountry, checkCountriesCounter, clearCountriesCounter}