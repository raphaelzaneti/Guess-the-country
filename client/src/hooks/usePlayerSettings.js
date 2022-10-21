import React, {createContext, useState, useContext} from 'react'

const PlayerSettingsContext = createContext()

export default function PlayerSettingsProvider(props){
    
    const [numberOfCountries, setNumberOfCountries] = useState(null)

    return(
        <PlayerSettingsContext.Provider value={{
            numberOfCountries, 
            setNumberOfCountries
        }}>
            {props.children}
        </PlayerSettingsContext.Provider>
    )
}

export function useHints(){
    const {numberOfCountries, setNumberOfCountries} = useContext(PlayerSettingsContext)
    return {numberOfCountries, setNumberOfCountries}
}