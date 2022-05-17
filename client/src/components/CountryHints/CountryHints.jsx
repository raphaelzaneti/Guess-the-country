import React, {useEffect, useState } from 'react'
import axios from 'axios'
import './CountryHints.css'
import { newHint, useHints } from './newHint'
import { useCountry } from './useCountry'
import Button from '../Button'

const CountryHints = () => {
    const { country, setCountry, generateCountry } = useCountry()
    const [forceUpdate, setForceUpdate] = useState(0)
    function useForceUpdate() {
        setForceUpdate(forceUpdate + 1)
    }

    setInterval(useForceUpdate, 10);

    useEffect(generateCountry, [])

    //from backend
    const countryFlag = <div className='hints__flag-size'><img class="img-fluid" src={"https://countryflagsapi.com/png/"+country.country} /></div>

    const [countryHints, setCountryHints] = useState(null)
    const [backendCount, setBackendCount] = useState(0)
    
    const [backendHints, setBackendHints] = useState(Array(15).fill(false))
    
    function backendTest() {
        axios.get('http://localhost:3001/countries/generate')
            .then(res => {
                const data = res.data
                setCountryHints(data)
                setCountry(data.country_id)
                console.log(res.data)
            })
        
        axios.get('http://localhost:3001/hints/clear')
            .then(res =>{
                setBackendHints(res.data)
            })
    }

    function handleBackendHints(){
        axios.get('http://localhost:3001/hints')
            .then(async res =>{
                setBackendHints(res.data)
            })
    }

    useEffect(() => console.log(backendHints), [backendHints])

    return (
        <section className='hints'>
            <span className='hints__hint-type'>Capital:</span> {backendHints[0] === true ? countryHints.capital : "" } <br />
            <span className='hints__hint-type'>Continent:</span> {backendHints[1] ? countryHints.continent : ""} <br />
            <span className='hints__hint-type'>Currency:</span> {backendHints[2] ? countryHints.currency_name : ""} <br />
            <span className='hints__hint-type'>Domain termination (e.g. .uk, .ch):</span> {backendHints[3] === true ? countryHints.tld : ""} <br />
            <span className='hints__hint-type'>Average elevation:</span> {backendHints[4] === true ? countryHints.elevation : ""} <br />
            <span className='hints__hint-type'>Government Type:</span> {backendHints[5] === true ? countryHints.government : ""} <br />
            <span className='hints__hint-type'>Independence year:</span> {backendHints[6] === true ? countryHints.independence : ""} <br />
            <span className='hints__hint-type'>Is a landlocked country?</span> {backendHints[7] === true ? countryHints.landlocked : ""} <br />
            <span className='hints__hint-type'>Languages:</span> {backendHints[8] === true ? countryHints.languages : ""} <br />
            <span className='hints__hint-type'>Life expectancy:</span> {backendHints[9] === true ? countryHints.expectancy : ""} <br />
            <span className='hints__hint-type'>Population:</span> {backendHints[10] === true ? countryHints.population : ""} <br />
            <span className='hints__hint-type'>Main religion:</span> {backendHints[11] === true ? countryHints.religion : ""} <br />
            <span className='hints__hint-type'>Area:</span> {backendHints[12] === true ? countryHints.area : ""} <br />
            <span className='hints__hint-type'>Abbreviation:</span> {backendHints[13] === true ? countryHints.abbreviation : ""} <br />
            <span className='hints__hint-type'>National flag:</span> {backendHints[14] === true ? countryFlag : ""} <br />
            <Button
                type="button"
                class="btn-secondary btn-sm hints__button-new"
                id="but-hint"
                caption="New hint"
                onClick={() => handleBackendHints()}
            />
            <button onClick={() => backendTest()}>Test</button>

        </section>
    )

}

export default CountryHints