import {randomIndex} from './randomIndex'
import {getCountryData} from './script'

let countriesIndex = 0

export function newTurn(){

    let i = randomIndex()
    countriesIndex = i

    let countryObj = getCountryData(countriesIndex)
    
    return countryObj
}

export default {countriesIndex}