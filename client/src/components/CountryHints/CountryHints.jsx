import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './CountryHints.css'
import { useCountry } from './useCountry'
import Button from '../Button'
import { useHints } from '../../hooks/useHints'
import { usePlayerSettings } from '../../hooks/usePlayerSettings'

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
    const { numberOfCountries, setNumberOfCountries } = usePlayerSettings()
    const [countPlayedCountries, setCountPlayedCountries] = useState(0)
    const { generatedHints, setGeneratedHints, countedHints, setCountedHints, currentHint, setCurrentHint } = useHints()

    useEffect(generateRandomCountry, [country])

    const countryFlag = countryHints ? <div className='hints__flag-size'><img class="img-fluid" src={'https://flagcdn.com/64x48/'+(countryHints.abbreviation === null ? ""  :countryHints.abbreviation.toString().toLowerCase())+'.png'} /></div> : ""
    
    async function generateRandomCountry() {
        if (!handlePlayCounts()) {
            return
        } else {

            setGeneratedHints(Array(15).fill(false))

            let mapNullHints

            await axios.get('http://localhost:3001/countries/generate-country')
                .then(res => {

                    if (res.data.finished) {
                        handlePlayCounts()
                        return
                    }
                    const data = res.data
                    setCountryHints(data)
                    setCountryId(data.country_id)

                    //Array of values to be considered as null for the hints
                    const nullElements = [-1, '-1', "Unknown", null, 'null']
                    mapNullHints = Object.values(data).map(e => nullElements.includes(e) ? null : "not null")
                    mapNullHints.shift()
                    mapNullHints.shift()
                })

            await axios.get('http://localhost:3001/hints/clear', { params: { null_hints: mapNullHints } })
                .then(res => {
                    setGeneratedHints(res.data.hints)
                })

            setNullHints(mapNullHints)
        }
    }

    function handlePlayCounts() {
        if (countPlayedCountries < numberOfCountries) {
            setCountPlayedCountries(countPlayedCountries + 1)
            return true
        } else {
            setNumberOfCountries(-1)
            return false
        }

    }

    async function generateHint() {
        const currentHintsArr = generatedHints
        let newHintsArr = []

        await axios.get('http://localhost:3001/hints/generate')
            .then(async res => {
                setGeneratedHints(res.data)
                newHintsArr = res.data
            })

        setCountedHints(nullHints)
        getNewHint(currentHintsArr, newHintsArr)
        console.log(`plays: ${countPlayedCountries}, limit: ${numberOfCountries}`)
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
                setCountedHints(nullHints)
            })
    }

    return (
        <section className='hints'>
            <span>
                <span className={nullHints[0] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Capital:</span> {generatedHints[0] && nullHints[0] !== null  ? countryHints.capital : ""}
            </span>
            <span>
                <span className={nullHints[1] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Continent:</span> {generatedHints[1] && nullHints[1] !== null ? countryHints.continent : ""}
            </span>
            <span>
                <span className={nullHints[2] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Currency:</span> {generatedHints[2] && nullHints[2] !== null ? countryHints.currency_name : ""}
            </span>
            <span>
                <span className={nullHints[3] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Domain termination (e.g. .uk, .ch):</span> {generatedHints[3] === true && nullHints[3] !== null ? countryHints.tld : ""}
            </span>
            <span>
                <span className={nullHints[4] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Average elevation:</span> {(generatedHints[4] === true && nullHints[4] !== null )? Number(countryHints.elevation).toLocaleString('en-US') : ""}
            </span>
            <span>
                <span className={nullHints[5] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Government Type:</span> {generatedHints[5] === true && nullHints[5] !== null ? countryHints.government : ""}
            </span>
            <span>
                <span className={nullHints[6] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Independence year:</span> {generatedHints[6] === true && nullHints[6] !== null ? countryHints.independence : ""}
            </span>
            <span>
                <span className={nullHints[7] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Is a landlocked country?</span> {(generatedHints[7] === true && nullHints[7] !== null)
                    ? (countryHints.landlocked ? "Yes" : "No") 
                    : ""}
            </span>
            <span>
                <span className={nullHints[8] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Languages:</span> {generatedHints[8] === true && nullHints[8] !== null ? countryHints.languages : ""}
            </span>
            <span>
                <span className={nullHints[9] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Life expectancy:</span> {generatedHints[9] === true && nullHints[9] !== null ? countryHints.expectancy : ""}
            </span>
            <span>
                <span className={nullHints[10] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Population:</span> {(generatedHints[10] === true && nullHints[10] !== null) ? Number(countryHints.population).toLocaleString('en-US') : ""}
            </span>
            <span>
                <span className={nullHints[11] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Main religion:</span> {generatedHints[11] === true && nullHints[11] !== null ? countryHints.religion : ""}
            </span>
            <span>
                <span className={nullHints[12] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Area:</span> {(generatedHints[12] === true && nullHints[12] !== null) ? Number(countryHints.area).toLocaleString('en-US') : ""}
            </span>
            <span>
                <span className={nullHints[13] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>Abbreviation:</span> {generatedHints[13] === true && nullHints[13] !== null ? countryHints.abbreviation : ""}
            </span>
            <span>
                <span className={nullHints[14] === null ? 'hints__hint-type hints__hint-type-inactive' : 'hints__hint-type'}>National flag:</span> {generatedHints[14] === true && nullHints[14] !== null ? countryFlag : ""}
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