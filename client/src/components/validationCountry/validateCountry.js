import React, { createContext, useContext, useState } from 'react'
import { newTurn } from '../CountryHints/newTurn'
import ResultBadge from '../ResultBadge'
import { useScore } from '../ScoreBoard/scoreCount'

const CorrectContext = createContext()
const CountriesArrayContext = createContext()

export function CorrectProvider(props){
    
    const [correct, setCorrect] = useState(null)
    
    return(
        <CorrectContext.Provider value={{
            correct,
            setCorrect
        }}>
            {props.children}
        </CorrectContext.Provider>
    )
}


export function validateCountry(submitedAnswer, correctCountry, callback, correctCallback, wrongCallback){

    if(submitedAnswer === correctCountry){
        callback()
        correctCallback()

        return true
    } else{
        wrongCallback()

        return false
    }

}

export function useCorrect(){
    const context = useContext(CorrectContext)

    const {correct, setCorrect} = context

    return {correct, setCorrect}
}

export function CountriesArrayProvider(props){
    const [correctCountriesArray, setCorrectCountriesArray] = useState([])
    const [wrongCountriesArray, setWrongCountriesArray] = useState([])
    
    return(
        <CountriesArrayContext.Provider value={{
            correctCountriesArray, 
            setCorrectCountriesArray: country => setCorrectCountriesArray([...correctCountriesArray, country]),
            wrongCountriesArray, 
            setWrongCountriesArray: country => setWrongCountriesArray([...wrongCountriesArray, country])
        }}>
            {props.children}
        </CountriesArrayContext.Provider>
    )
}

export function useCountriesArray(){
    const context = useContext(CountriesArrayContext)

    const {correctCountriesArray, setCorrectCountriesArray, wrongCountriesArray, setWrongCountriesArray} = context

    return {correctCountriesArray, setCorrectCountriesArray, wrongCountriesArray, setWrongCountriesArray}
}