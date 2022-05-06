import React from "react";
import Modal from "../Modal";

const Rules = () => {
    return (
        <>
            <Modal
                buttonCaption="GAME RULES"
                title="Game Rules"
                content={
                    <>
                        <p><span>Goal:</span> You must "guess the country" from the hints. There are four types of hints: Capital, Population, Area and Continent. The less hints you use, more points you earn!</p>
                        <p><span>Hints:</span> You start the turn with just one hint. To use one more hint, you just have do press the "New hint" button.</p>
                        <p><span>1 Hint -</span>400 points</p>
                        <p><span>2 Hints -</span>200 points</p>
                        <p><span>3 Hints -</span>100 points</p>
                        <p><span>4 Hints -</span>50 points</p>
                        <p><span>5 Hint -</span>30 points</p>
                        <p><span>6 Hints -</span>20 points</p>
                        <p><span>7 Hints -</span>15 points</p>
                        <p><span>8 Hints -</span>10 points</p>
                        <p><span>9 Hint -</span>6 points</p>
                        <p><span>10 Hints -</span>4 points</p>
                        <p><span>11 Hints -</span>2 points</p>
                        <p><span>12 Hints -</span>1 points</p>
                        <p>Guess the country and enjoy the game!</p>
                    </>
                }
            />
        </>
    )
}

export default Rules