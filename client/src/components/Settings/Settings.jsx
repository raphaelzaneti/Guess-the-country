import React, { useState } from "react";
import { usePlayerSettings } from "../../hooks/usePlayerSettings";
import Modal from "../Modal/Modal";

const Settings = props =>{

    const [countriesInput, setCountriesInput] = useState(0)
    const {numberOfCountries, setNumberOfCountries} = usePlayerSettings()

    function nCountriesChange(e){
        setCountriesInput(e.target.value)
    }

    function validateSettings(){
        setNumberOfCountries(countriesInput)
    }

    return(
        <>
            <Modal
                buttonCaption="GAME SETTINGS"
                buttonId="settings-btn"
                title="Game Settings"
                modalId='settings__modal'
                okCallback={validateSettings}
                content={
                    <div className="settings__content">
                        <label htmlFor="countries">How many countries do you want to guess?</label>
                        <input type="number" value={countriesInput} onChange={(e) => nCountriesChange(e)} name="countries" />
                    </div>
                }
            />
        </>
    )
}

export default Settings