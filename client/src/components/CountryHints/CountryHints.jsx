import React, {useEffect, useState } from 'react'
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

    return (
        <section className='hints'>
            <span className='hints__hint-type'>Capital:</span> {hints[0] === true ? country.city : ""} <br />
            <span className='hints__hint-type'>Population:</span> {hints[1] === true ? country.population : ""} <br />
            <span className='hints__hint-type'>Area:</span> {hints[2] === true ? country.area : ""} <br />
            <span className='hints__hint-type'>Coastline:</span> {hints[3] === true ? country.costline : ""} <br />
            <span className='hints__hint-type'>Currency:</span> {hints[4] === true ? country.currency : ""} <br />
            <span className='hints__hint-type'>Domain termination (e.g. .uk, .ch):</span> {hints[5] === true ? country.tld : ""} <br />
            <span className='hints__hint-type'>Average elevation:</span> {hints[6] === true ? country.elevation : ""} <br />
            <span className='hints__hint-type'>Government Type:</span> {hints[7] === true ? country.government : ""} <br />
            <span className='hints__hint-type'>Is a landlocked country?</span> {hints[8] === true ? country.landlocked : ""} <br />
            <span className='hints__hint-type'>Laguages:</span> {hints[9] === true ? country.languages : ""} <br />
            <span className='hints__hint-type'>Life expectancy:</span> {hints[10] === true ? country.expectancy : ""} <br />
            <span className='hints__hint-type'>Main religion:</span> {hints[11] === true ? country.religion : ""} <br />
            <span className='hints__hint-type'>National flag:</span> {hints[12] === true ? countryFlag : ""} <br />
            <Button
                type="button"
                class="btn-secondary btn-sm hints__button-new"
                id="but-hint"
                caption="New hint"
                onClick={() => setHints(newHint)}
            />

        </section>
    )

}

export default CountryHints