import React, { useState } from 'react'
import './GuessForm.css'
import Button from '../Button'
import ResultBadge from '../ResultBadge'
import { useCountry } from '../CountryHints/useCountry'
import axios from 'axios'
import {useHints} from '../../hooks/useHints'

const GuessedForm = () => {
    const { country, setCountry, countryId, setCountryId } = useCountry()
 
    const [correctStatus, setCorrectStatus] = useState(null)
    const [answer, setAnswer] = useState("")
    const {generatedHints, setGeneratedHints, currentHint, setCurrentHint } = useHints()

    function handleInputChange(e) {
        setAnswer(e.target.value)
    }

    function preventSubmit(e) {
        e.preventDefault()
    }

    function handleSubmit(){
        console.log(generatedHints)

        axios.post("http://localhost:3001/countries/validation", {data: 
            {country: answer, id: countryId, current_hint: currentHint, hints_list: generatedHints}
        }).then(res => {
            console.log(res.data)
            setCountry(res.data)
            setCorrectStatus(res.data.result)
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