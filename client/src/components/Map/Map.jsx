import React, {useEffect, useState} from "react";
import './map.css'
import WorldMap from 'react-svg-worldmap';
import { useCountry } from '../CountryHints/useCountry'
import { useCountriesArray } from '../validationCountry/validateCountry.js'

export default props => {

    const [currentCountryAbbreviation, setCurrentCountryAbbreviation] = useState(null)
    const [countriesMap, setCountriesMap] = useState([])
    const [counter, setCounter] = useState(0)
    const { country, setCountry, generateCountry } = useCountry()
    const { correctCountriesArray, setCorrectCountriesArray, wrongCountriesArray, setWrongCountriesArray } = useCountriesArray()

    function showCountry(abbr){
        setCountriesMap(countriesMap.map(
            e => e.value = 1
        ))
        setCountriesMap([...countriesMap, {country: abbr, value: 2}])
        
    }

    function handleCountry(abbr){
        const notValidAbbr = abbr === null || abbr === "" || abbr === "None" || abbr === false
        
        if(notValidAbbr){
            return null
        } else{
            console.log('country: '+currentCountryAbbreviation.country+' abbr: '+abbr)
            showCountry(abbr)
        }
    }

    useEffect(()=>{
        if(country===null || country.abbr ===null){
            return null
        } else{
            setCurrentCountryAbbreviation(country)
        }
    })

    useEffect(()=>{
        if(country===null || country.abbr ===null || currentCountryAbbreviation ===null || currentCountryAbbreviation.abbr ===null){
            return null
        } else{
            handleCountry(currentCountryAbbreviation.abbr)
        }
    }, [correctCountriesArray, wrongCountriesArray])

    return (
        <>
            <div id="map" className="map">
                <WorldMap 
                    color={'red'}
                    size="lg"
                    data={countriesMap}
                />
            </div>
        </>
    )
}