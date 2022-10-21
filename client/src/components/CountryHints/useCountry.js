import React, {createContext, useState, useContext} from 'react'
import { useGuessedCountry } from '../../containers/Game/guessedCountry'
import { newTurn } from './newTurn'

const CountryContext = createContext()

export default function CountryProvider(props){
    
    const [countryId, setCountryId] = useState()
    const [country, setCountry] = useState({})

    return(
        <CountryContext.Provider value={{
            country, 
            setCountry,
            countryId, 
            setCountryId,
        }}>
            {props.children}
        </CountryContext.Provider>
    )
}

export function useCountry(){
    const {country, setCountry, countryId, setCountryId} = useContext(CountryContext)
    return {country, setCountry, countryId, setCountryId}
}