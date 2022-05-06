import React, { createContext, useContext, useState } from "react";

const country = "null"

export const guessedCountryContext = createContext()

export function ProviderGuessedCountry(props){
    
    const [guessedCountry, setGuessedCountry] = useState(null)


    return(
        <guessedCountryContext.Provider value={{
            guessedCountry,
            setGuessedCountry
        }}>
            {props.children}
        </guessedCountryContext.Provider>
    )
}

export function useGuessedCountry(){
    const context = useContext(guessedCountryContext)

    const {guessedCountry, setGuessedCountry} = context

    return {guessedCountry, setGuessedCountry}
}