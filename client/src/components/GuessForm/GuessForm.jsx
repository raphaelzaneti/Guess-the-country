import React, { useState } from 'react'
import './GuessForm.css'
import Button from '../Button'
import { useGuessedCountry } from '../../containers/Game/guessedCountry'
import { useCorrect, useCountriesArray, validateCountry } from '../validationCountry/validateCountry.js'
import ResultBadge from '../ResultBadge'
import { useScore } from '../ScoreBoard/scoreCount'
import { useCountry } from '../CountryHints/useCountry'
import axios from 'axios'

const GuessedForm = () => {
    const { country, setCountry, generateCountry } = useCountry()
 
    const [correctStatus, setCorrectStatus] = useState(null)
    const [answer, setAnswer] = useState("")

    function handleInputChange(e) {
        setAnswer(e.target.value)
    }

    function preventSubmit(e) {
        e.preventDefault()
    }

    function handleSubmit(){
        console.log('ok', country)
        axios.post("http://localhost:3001/countries/validation", {data: 
            {country: answer, id: country}
        }).then(res => {
            console.log(res.data)
            setCorrectStatus(res.data)
        })

        document.getElementById('country-selected').value = ""
    }

    return (
        <div className='guess-form'>
            <form id="form" onSubmit={preventSubmit}>
                <span>Country name:</span>
                <input type="text" name="country" id="country-selected" className='guess-form__input' onChange={e => handleInputChange(e)} />
                <Button 
                    caption='Submit'
                    className="btn btn-success guess-form__button-submit"
                    onClick={handleSubmit}
                />
                <ResultBadge correct={correctStatus} className="guess-form__badge"/>
            </form>
        </div>
    )
}

export default GuessedForm