import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import './statistics.css'

const Statistics = () => {

    function updateDifficulty(){
        axios.get('http://localhost:3001/difficulty/update-tables')
    }

    return (
        <>
            <Modal
                buttonCaption="STATISTICS"
                buttonId="statistics-btn"
                title="Game Statistics"
                modalId='statistics__modal'
                content={
                    <div className="statistics__content">
                        <p>Space to future statistics....</p>
                        <button className="statistics__modal-btn" onClick={updateDifficulty}>Update Difficulty levels</button>
                    </div>
                }
            />
        </>
    )
}

export default Statistics