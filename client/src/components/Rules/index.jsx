import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
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

    useEffect(readRules, [])

    return (
        <>
            <Modal
                buttonCaption="GAME RULES"
                title="Game Rules"
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