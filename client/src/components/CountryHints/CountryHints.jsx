import React, {useEffect, useState } from 'react'
import axios from 'axios'
import './CountryHints.css'
import { newHint, useHints } from './newHint'
import { useCountry } from './useCountry'
import Button from '../Button'

const CountryHints = () => {
    const { country, setCountry, countryId, setCountryId } = useCountry()
    const [forceUpdate, setForceUpdate] = useState(0)
    function useForceUpdate() {
        setForceUpdate(forceUpdate + 1)
    }

    setInterval(useForceUpdate, 10);

    
    //from backend
    
    const [countryHints, setCountryHints] = useState(null)
    const [backendHints, setBackendHints] = useState(Array(15).fill(false))
    const [nullHints, setNullHints] = useState([])

    useEffect(generateRandomCountry, [country])
    
    const countryFlag = countryHints ? <div className='hints__flag-size'><img class="img-fluid" src={"https://countryflagsapi.com/png/"+countryHints.country} /></div> : ""
    
    async function generateRandomCountry() {
        setBackendHints(Array(15).fill(false))

        let mapNullHints

        await axios.get('http://localhost:3001/countries/generate')
            .then(res => {
                const data = res.data
                setCountryHints(data)
                setCountryId(data.country_id)
                console.log(data)

                mapNullHints = Object.values(data).map(e => e===null ? null : "not null")
                mapNullHints.shift()
                mapNullHints.shift()
            })
        
        axios.get('http://localhost:3001/hints/clear', {params: {null_hints: mapNullHints}})
            .then(res =>{
                setBackendHints(res.data)
            })
        
        setNullHints(mapNullHints)
    }

    function generateHint(){
        axios.get('http://localhost:3001/hints/generate')
            .then(async res =>{
                setBackendHints(res.data)
            })
    }

    useEffect(() => console.log(backendHints), [backendHints])

    return (
        <section className='hints'>
            <span className={nullHints[0]=== null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type' }>Capital:</span> {backendHints[0] ? countryHints.capital : "" } <br />
            <span className={nullHints[1]=== null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type' }>Continent:</span> {backendHints[1] ? countryHints.continent : ""} <br />
            <span className={nullHints[2]=== null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type' }>Currency:</span> {backendHints[2] ? countryHints.currency_name : ""} <br />
            <span className={nullHints[3]=== null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type' }>Domain termination (e.g. .uk, .ch):</span> {backendHints[3] === true ? countryHints.tld : ""} <br />
            <span className={nullHints[4]=== null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type' }>Average elevation:</span> {backendHints[4] === true ? countryHints.elevation : ""} <br />
            <span className={nullHints[5]=== null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type' }>Government Type:</span> {backendHints[5] === true ? countryHints.government : ""} <br />
            <span className={nullHints[6]=== null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type' }>Independence year:</span> {backendHints[6] === true ? countryHints.independence : ""} <br />
            <span className={nullHints[7]=== null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type' }>Is a landlocked country?</span> {backendHints[7] === true ? countryHints.landlocked : ""} <br />
            <span className={nullHints[8]=== null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type' }>Languages:</span> {backendHints[8] === true ? countryHints.languages : ""} <br />
            <span className={nullHints[9]=== null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type' }>Life expectancy:</span> {backendHints[9] === true ? countryHints.expectancy : ""} <br />
            <span className={nullHints[10]=== null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type' }>Population:</span> {backendHints[10] === true ? countryHints.population : ""} <br />
            <span className={nullHints[11]=== null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type' }>Main religion:</span> {backendHints[11] === true ? countryHints.religion : ""} <br />
            <span className={nullHints[12]=== null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type' }>Area:</span> {backendHints[12] === true ? countryHints.area : ""} <br />
            <span className={nullHints[13]=== null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type' }>Abbreviation:</span> {backendHints[13] === true ? countryHints.abbreviation : ""} <br />
            <span className={nullHints[14]=== null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type' }>National flag:</span> {backendHints[14] === true ? countryFlag : ""} <br />
            <Button
                type="button"
                class="btn-secondary btn-sm hints__button-new"
                id="but-hint"
                caption="New hint"
                onClick={() => generateHint()}
            />

        </section>
    )

}

export default CountryHints