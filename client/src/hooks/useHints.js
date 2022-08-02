import React, {createContext, useState, useContext} from 'react'

const HintsContext = createContext()

export default function HintsProvider(props){
    
    const [generatedHints, setGeneratedHints] = useState([])
    const [currentHint, setCurrentHint] = useState(null)

    return(
        <HintsContext.Provider value={{
            generatedHints, 
            setGeneratedHints, 
            currentHint, 
            setCurrentHint
        }}>
            {props.children}
        </HintsContext.Provider>
    )
}

export function useHints(){
    const {generatedHints, setGeneratedHints, currentHint, setCurrentHint} = useContext(HintsContext)
    return {generatedHints, setGeneratedHints, currentHint, setCurrentHint}
}