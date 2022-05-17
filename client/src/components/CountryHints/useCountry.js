import React, {createContext, useState, useContext} from 'react'
import { useGuessedCountry } from '../../containers/Game/guessedCountry'
import { useHints, clearBoolean } from './newHint'
import { newTurn } from './newTurn'

const CountryContext = createContext()

export default function CountryProvider(props){
    
    const {hints, setHints} = useHints()
    const [country, setCountry] = useState({})
    const {guessedCountry, setGuessedCountry} = useGuessedCountry()

    function generateCountry(){
       /* clearBoolean()
        setHints(Array(13).fill(false))
        let selectedCountry = newTurn()
        setCountry(selectedCountry)
        setGuessedCountry(selectedCountry.country)
        */
    }

    function setCorrectCountryId(id){
        setCountry(id)
    }

    return(
        <CountryContext.Provider value={{
            country, 
            setCountry,
            generateCountry
        }}>
            {props.children}
        </CountryContext.Provider>
    )
}

export function useCountry(){
    const {country, setCountry, generateCountry} = useContext(CountryContext)
    return {country, setCountry, generateCountry}
}