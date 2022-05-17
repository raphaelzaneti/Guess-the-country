import React, { useEffect, useState } from "react";
import './map.css'
import WorldMap from 'react-svg-worldmap';
import { useCountry } from '../CountryHints/useCountry'
import { useCountriesArray } from '../validationCountry/validateCountry.js'

export default props => {

    const [currentCountryAbbreviation, setCurrentCountryAbbreviation] = useState(null)
    const [countriesMap, setCountriesMap] = useState([{country: 'XX', value: 1}])
    const [counter, setCounter] = useState(0)
    const { country, setCountry, countryId, setCountryId } = useCountry()
    const { correctCountriesArray, setCorrectCountriesArray, wrongCountriesArray, setWrongCountriesArray } = useCountriesArray()

    function showCountry(abbr) {
        
        setCountriesMap(countriesMap.map(e =>e.value = 1))
        setCountriesMap([...countriesMap, { country: abbr, value: 2 }])
        
    }

    useEffect(() => console.log(countriesMap), [countriesMap])

    function handleCountry(abbr) {
        const notValidAbbr = abbr === null || abbr === "" || abbr === "None" || abbr === false

        if (notValidAbbr) {
            return null
        } else {
            showCountry(abbr)
        }
    }

    useEffect(() => {

        if (country === null || country.abbr === null || country.abbr === undefined) {
            return null
        } else {
            handleCountry(country.abbr)
        }
    }, [country])

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