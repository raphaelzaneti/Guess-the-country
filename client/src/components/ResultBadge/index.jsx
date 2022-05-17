import React from 'react'
import { useCorrect, validateCountry } from '../validationCountry/validateCountry'

export default function ResultBadge(props){

    return(
        <>
            {props.correct === null ? ""
            :
                <>{props.correct ? 
                    <span className={"badge bg-success "+props.className}>Correct</span>
                    : <span className={"badge bg-danger "+props.className}>Wrong</span>
                }</>
            }
        </>
    )
}