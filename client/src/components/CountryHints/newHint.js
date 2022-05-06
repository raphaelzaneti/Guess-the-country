import React, { createContext, useContext, useState } from "react"

let booleanTips = Array(13).fill(false)
const HintsContext = createContext()

export function HintsProvider(props){
    
    const [hints, setHints] = useState(Array(13).fill(false))
    
    return(
        <HintsContext.Provider value={{
            hints, setHints
        }}>
            {props.children}
        </HintsContext.Provider>
    )
}

export function useHints(){
    const {hints, setHints} = useContext(HintsContext)

    return {hints, setHints}
}

export function clearBoolean(){
    booleanTips = Array(13).fill(false)
    return booleanTips
}

export function newHint(){
    let hintIndex = Math.floor(Math.random()*13)
    
    if(booleanTips.every(e => e===true)){
        return booleanTips
    }

    if(booleanTips[hintIndex] === true){
        while(booleanTips[hintIndex] === true){
            hintIndex = Math.floor(Math.random()*12)
        }
        booleanTips[hintIndex] = true
    } else{
        booleanTips[hintIndex] = true
    }
    
    return booleanTips
}


export default HintsContext