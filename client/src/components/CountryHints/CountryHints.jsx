import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './CountryHints.css'
import { useCountry } from './useCountry'
import Button from '../Button'
import { useHints } from '../../hooks/useHints'

const CountryHints = () => {
    const { country, setCountry, countryId, setCountryId } = useCountry()
    const [forceUpdate, setForceUpdate] = useState(0)
    function useForceUpdate() {
        setForceUpdate(forceUpdate + 1)
    }

    setInterval(useForceUpdate, 10);


    //from backend

    const [countryHints, setCountryHints] = useState(null)
    const [nullHints, setNullHints] = useState([])
    const { generatedHints, setGeneratedHints, currentHint, setCurrentHint } = useHints()

    useEffect(generateRandomCountry, [country])

    const countryFlag = countryHints ? <div className='hints__flag-size'><img class="img-fluid" src={"https://countryflagsapi.com/png/" + countryHints.country} /></div> : ""

    async function generateRandomCountry() {
        setGeneratedHints(Array(15).fill(false))

        let mapNullHints

        await axios.get('http://localhost:3001/countries/generate')
            .then(res => {
                const data = res.data
                setCountryHints(data)
                setCountryId(data.country_id)
                console.log(data)

                mapNullHints = Object.values(data).map(e => e === null ? null : "not null")
                mapNullHints.shift()
                mapNullHints.shift()
            })

        axios.get('http://localhost:3001/hints/clear', { params: { null_hints: mapNullHints } })
            .then(res => {
                setGeneratedHints(res.data)
            })

        setNullHints(mapNullHints)
    }

    async function generateHint() {
        const currentHintsArr = generatedHints
        let newHintsArr = []

        await axios.get('http://localhost:3001/hints/generate')
            .then(async res => {
                setGeneratedHints(res.data)
                newHintsArr = res.data
            })

        getNewHint(currentHintsArr, newHintsArr)
    }

    function getNewHint(oldArr, newArr) {

        let newHintIndex

        newArr.map((e, i) => {
            if (e !== oldArr[i])
                newHintIndex = i
        })

        setCurrentHint(newHintIndex)
    }

    async function generateAllHints() {

        await axios.get('http://localhost:3001/hints/generate-all')
            .then(async res => {
                setGeneratedHints(res.data)
                setCurrentHint('all')
            })
    }

    return (
        <section className='hints'>
            <span>
                <span className={nullHints[0] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Capital:</span> {generatedHints[0] ? countryHints.capital : ""}
            </span>
            <span>
                <span className={nullHints[1] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Continent:</span> {generatedHints[1] ? countryHints.continent : ""}
            </span>
            <span>
                <span className={nullHints[2] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Currency:</span> {generatedHints[2] ? countryHints.currency_name : ""}
            </span>
            <span>
                <span className={nullHints[3] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Domain termination (e.g. .uk, .ch):</span> {generatedHints[3] === true ? countryHints.tld : ""}
            </span>
            <span>
                <span className={nullHints[4] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Average elevation:</span> {generatedHints[4] === true ? countryHints.elevation : ""}
            </span>
            <span>
                <span className={nullHints[5] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Government Type:</span> {generatedHints[5] === true ? countryHints.government : ""}
            </span>
            <span>
                <span className={nullHints[6] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Independence year:</span> {generatedHints[6] === true ? countryHints.independence : ""}
            </span>
            <span>
                <span className={nullHints[7] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Is a landlocked country?</span> {generatedHints[7] === true ? countryHints.landlocked : ""}
            </span>
            <span>
                <span className={nullHints[8] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Languages:</span> {generatedHints[8] === true ? countryHints.languages : ""}
            </span>
            <span>
                <span className={nullHints[9] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Life expectancy:</span> {generatedHints[9] === true ? countryHints.expectancy : ""}
            </span>
            <span>
                <span className={nullHints[10] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Population:</span> {generatedHints[10] === true ? countryHints.population : ""}
            </span>
            <span>
                <span className={nullHints[11] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Main religion:</span> {generatedHints[11] === true ? countryHints.religion : ""}
            </span>
            <span>
                <span className={nullHints[12] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Area:</span> {generatedHints[12] === true ? countryHints.area : ""}
            </span>
            <span>
                <span className={nullHints[13] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Abbreviation:</span> {generatedHints[13] === true ? countryHints.abbreviation : ""}
            </span>
            <span>
                <span className={nullHints[14] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>National flag:</span> {generatedHints[14] === true ? countryFlag : ""}
            </span>
            <div className="hints__button-area">
                <Button
                    type="button"
                    class="btn-secondary btn-sm hints__button-new"
                    id="but-hint"
                    caption="New hint"
                    onClick={() => generateHint()}
                />

                <Button
                    type="button"
                    class="btn-secondary btn-sm hints__button-all"
                    id="but-all-hints"
                    caption="All hints"
                    onClick={() => generateAllHints()}
                />
            </div>

        </section>
    )

}

export default CountryHints