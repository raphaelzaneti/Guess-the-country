import React, { createContext, useContext, useState } from 'react'
import { useHints } from '../CountryHints/newHint'

const ScoreContext = createContext()

export default function ScoreProvider(props){
    
    const [score, setScore] = useState(0)
    const [countAnswers, setCountAnswers] = useState(0)
    const {hints, setHints} = useHints()
    
    function handleScore(){
        const points = [400, 200, 100, 50, 30, 20, 15, 10, 6, 4, 2, 1]
        
        let hintsCounter = hints.filter(e => e===true).length
        return points[hintsCounter-1]
    }
    
    return(
        <ScoreContext.Provider value={{
            score,
            setScore, 
            countAnswers, 
            setCountAnswers,
            handleScore
        }}>
            {props.children}
        </ScoreContext.Provider>
    )
}

export function useScore(){
    
    const {score, setScore, countAnswers, setCountAnswers, handleScore} = useContext(ScoreContext)

    return {score, setScore, countAnswers, setCountAnswers, handleScore}

}
