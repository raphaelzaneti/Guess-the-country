import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import './rules.css'

const Rules = () => {

    const [rules, setRules] = useState(null)

    async function readRules(){
        axios.get('http://localhost:3001/rules/read')
            .then(res => {
                let rulesText = res.data
                setRules(rulesText)
            })
    }

    return (
        <>
            <Modal
                buttonId="rules-btn"
                buttonCaption="GAME RULES"
                btnCallback={readRules}
                title="Game Rules"
                modalId="rules__modal"
                content={
                    <div className="rules__text">
                        {rules}
                    </div>
                }
            />
        </>
    )
}

export default Rules