import React, { useState } from 'react'
import './GuessForm.css'
import Button from '../Button'
import { useGuessedCountry } from '../../containers/Game/guessedCountry'
import { useCorrect, useCountriesArray, validateCountry } from '../validationCountry/validateCountry.js'
import ResultBadge from '../ResultBadge'
import { useScore } from '../ScoreBoard/scoreCount'
import { useCountry } from '../CountryHints/useCountry'

const GuessedForm = () => {

    const { guessedCountry, setGuessedCountry } = useGuessedCountry()
    const { country, setCountry, generateCountry } = useCountry()
    const { correct, setCorrect } = useCorrect()
    const { score, setScore, countAnswers, setCountAnswers, handleScore} = useScore()
    const { correctCountriesArray, setCorrectCountriesArray, wrongCountriesArray, setWrongCountriesArray } = useCountriesArray()

    const [answer, setAnswer] = useState("")

    function handleInputChange(e) {
        setAnswer(e.target.value)
    }

    function preventSubmit(e) {
        e.preventDefault()
    }

    function handleSubmit() {
        setCorrect(validateCountry(
            answer || null,
            guessedCountry,
            () => setScore(score + 1),
            () => {
                setCorrectCountriesArray(guessedCountry)
                setScore(score+handleScore())
                setCountAnswers(countAnswers+1)
                
            },
            () => setWrongCountriesArray(guessedCountry)
        ))

        setAnswer("")
        generateCountry()
    }

    return (
        <div className='guess-form'>
            <form id="form" action="submit" onChange={handleInputChange} onSubmit={preventSubmit}>
                <span>Country name:</span>
                <input type="text" id="country-selected" value={answer} className='guess-form__input' />
                <Button
                    type="button"
                    class="btn btn-success guess-form__button-submit"
                    id="submit"
                    caption="Submit"
                    onClick={handleSubmit}
                />
                <ResultBadge className="guess-form__badge"/>
            </form>
        </div>
    )
}

export default GuessedForm