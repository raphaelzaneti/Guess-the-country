import React from 'react'
import { useCorrect, validateCountry } from '../validationCountry/validateCountry'

export default function ResultBadge(props){
    
    const {correct} = useCorrect()

    const correctBadge = <span className="badge bg-success">Correct</span>
    
    return(
        <>
            {correct === null ? ""
            :
                <>{correct ? 
                    <span className={"badge bg-success "+props.className}>Correct</span>
                    : <span className={"badge bg-danger "+props.className}>Wrong</span>
                }</>
            }
        </>
    )
}