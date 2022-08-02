import React, {createContext, useState, useContext} from 'react'

const HintsContext = createContext()

export default function HintsProvider(props){
    
    const [generatedHints, setGeneratedHints] = useState([])

    return(
        <HintsContext.Provider value={{
            generatedHints, 
            setGeneratedHints
        }}>
            {props.children}
        </HintsContext.Provider>
    )
}

export function useHints(){
    const {generatedHints, setGeneratedHints} = useContext(HintsContext)
    return {generatedHints, setGeneratedHints}
}