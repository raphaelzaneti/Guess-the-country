import React, {createContext, useState, useContext} from 'react'

const HintsContext = createContext()

export default function HintsProvider(props){
    
    const [generatedHints, setGeneratedHints] = useState([])
    const [countedHints, setCountedHints] = useState([])
    const [currentHint, setCurrentHint] = useState(null)

    return(
        <HintsContext.Provider value={{
            generatedHints, 
            setGeneratedHints, 
            countedHints, 
            setCountedHints,
            currentHint, 
            setCurrentHint
        }}>
            {props.children}
        </HintsContext.Provider>
    )
}

export function useHints(){
    const {generatedHints, setGeneratedHints, countedHints, setCountedHints, currentHint, setCurrentHint} = useContext(HintsContext)
    return {generatedHints, setGeneratedHints, countedHints, setCountedHints, currentHint, setCurrentHint}
}