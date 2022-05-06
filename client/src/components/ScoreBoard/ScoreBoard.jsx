import React, { useEffect, useState } from 'react'
import { useScore } from './scoreCount'


export default function ScoreBoard() {

    const { score, setScore, countAnswers, setCountAnswers } = useScore()

    return (
        <div id="score-board">
            <span>Score:</span> {score}<br />
            <span>Correct answers: </span> {countAnswers}
        </div>
    )

}