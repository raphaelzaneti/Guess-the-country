import React, { useState } from "react";
import { usePlayerSettings } from "../../hooks/usePlayerSettings";
import Modal from "../Modal/Modal";

const Settings = props =>{

    const [countriesInput, setCountriesInput] = useState(10)
    const {numberOfCountries, setNumberOfCountries} = usePlayerSettings()

    function nCountriesChange(e){
        if(e.target.value > 0 && e.target.value < 248 ){
            setCountriesInput(e.target.value)
        } else{
            setCountriesInput(countriesInput)
        }
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