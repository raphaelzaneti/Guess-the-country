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
    const {generatedHints, setGeneratedHints, countedHints, setCountedHints, currentHint, setCurrentHint } = useHints()

    function handleInputChange(e) {
        setAnswer(e.target.value)
    }

    function preventSubmit(e) {
        e.preventDefault()
    }

    function validateNullHints(){
        //This function transform the trues from generatedHints in falses, in case that they are hints with null values
        //The hints with null values are stored in countedHints, and it is easy to get it by comparing just the indexes
        console.log('generated:', generatedHints)
        console.log('counted: ', countedHints)
        return generatedHints.map((e, i) => (countedHints[i] === null) || (e === false) ? false : true)
    }

    function handleSubmit(){
        const hintsList = validateNullHints()
        console.log('hints list:', hintsList)
        console.log({country: answer, id: countryId, current_hint: currentHint, hints_list: hintsList})

        axios.post("http://localhost:3001/countries/validate-country", {data: 
            {country: answer, id: countryId, current_hint: currentHint, hints_list: hintsList}
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
                <span className='guess-form__country-name'>Country name:</span>
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