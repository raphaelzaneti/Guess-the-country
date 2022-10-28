import React, {createContext, useState, useContext} from 'react'

const PlayerSettingsContext = createContext()

export default function PlayerSettingsProvider(props){
    
    const [numberOfCountries, setNumberOfCountries] = useState(10)
    const [continentsSelected, setContinentsSelected] = useState(['All'])

    return(
        <PlayerSettingsContext.Provider value={{
            numberOfCountries, 
            setNumberOfCountries, 
            continentsSelected, 
            setContinentsSelected
        }}>
            {props.children}
        </PlayerSettingsContext.Provider>
    )
}

export function usePlayerSettings(){
    const {numberOfCountries, setNumberOfCountries, continentsSelected, setContinentsSelected} = useContext(PlayerSettingsContext)
    return {numberOfCountries, setNumberOfCountries, continentsSelected, setContinentsSelected}
}