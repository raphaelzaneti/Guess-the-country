import React, {useEffect, useState } from 'react'
import axios from 'axios'
import './CountryHints.css'
import { newHint, useHints } from './newHint'
import { useCountry } from './useCountry'
import Button from '../Button'

const CountryHints = () => {
    const {hints, setHints} = useHints()
    const { country, setCountry, generateCountry } = useCountry()
    const [forceUpdate, setForceUpdate] = useState(0)
    function useForceUpdate() {
        setForceUpdate(forceUpdate + 1)
    }

    setInterval(useForceUpdate, 10);

    useEffect(generateCountry, [])

    const countryFlag = <div className='hints__flag-size'><img class="img-fluid" src={"https://countryflagsapi.com/png/"+country.country} /></div>

    const [countryHints, setCountryHints] = useState(null)
    const [backendCount, setBackendCount] = useState(0)
    function backendTest() {
        axios.get('http://localhost:3001/teste', {params: {name: "Singapore"}})
            .then(res => {
                setCountryHints(res.data)
                console.log(res.data)
            })
        console.log(backendCount)
        setBackendCount(backendCount+1)
    }

    return (
        <section className='hints'>
            <span className='hints__hint-type'>Capital:</span> {hints[0] === true ? countryHints.capital : "" } <br />
            <span className='hints__hint-type'>Continent:</span> {hints[1] ? countryHints.continent : ""} <br />
            <span className='hints__hint-type'>Currency:</span> {hints[2] ? countryHints.currency_name : ""} <br />
            <span className='hints__hint-type'>Domain termination (e.g. .uk, .ch):</span> {hints[3] === true ? countryHints.tld : ""} <br />
            <span className='hints__hint-type'>Average elevation:</span> {hints[4] === true ? countryHints.elevation : ""} <br />
            <span className='hints__hint-type'>Government Type:</span> {hints[5] === true ? countryHints.government : ""} <br />
            <span className='hints__hint-type'>Independence year:</span> {hints[6] === true ? countryHints.independence : ""} <br />
            <span className='hints__hint-type'>Is a landlocked country?</span> {hints[7] === true ? countryHints.landlocked : ""} <br />
            <span className='hints__hint-type'>Languages:</span> {hints[8] === true ? countryHints.languages : ""} <br />
            <span className='hints__hint-type'>Life expectancy:</span> {hints[9] === true ? countryHints.expectancy : ""} <br />
            <span className='hints__hint-type'>Population:</span> {hints[10] === true ? countryHints.population : ""} <br />
            <span className='hints__hint-type'>Main religion:</span> {hints[11] === true ? countryHints.religion : ""} <br />
            <span className='hints__hint-type'>Area:</span> {hints[12] === true ? countryHints.area : ""} <br />
            <span className='hints__hint-type'>Abbreviation:</span> {hints[13] === true ? countryHints.abbreviation : ""} <br />
            <span className='hints__hint-type'>National flag:</span> {hints[14] === true ? countryFlag : ""} <br />
            <Button
                type="button"
                class="btn-secondary btn-sm hints__button-new"
                id="but-hint"
                caption="New hint"
                onClick={() => setHints(newHint)}
            />
            <button onClick={() => backendTest()}>Test</button>

        </section>
    )

}

export default CountryHints