import React, { useState } from "react";
import { usePlayerSettings } from "../../hooks/usePlayerSettings";
import Modal from "../Modal/Modal";
import './settings.css'

const Settings = props => {

    const [countriesInput, setCountriesInput] = useState(10)
    const [continentsInput, setContinentsInput] = useState([])
    const [allContinentsSelected, setAllContinentsSelected] = useState(false)
    const { numberOfCountries, setNumberOfCountries, continentsSelected, setContinentsSelected } = usePlayerSettings()

    function nCountriesChange(e) {
        if (e.target.value > 0 && e.target.value < 248) {
            setCountriesInput(e.target.value)
        } else {
            setCountriesInput(countriesInput)
        }
    }

    function continentChange(e){
        if(e.target.checked && !continentsInput.includes(e.target.value)){
            setContinentsInput([...continentsInput, e.target.value])
        } else if(!e.target.checked && continentsInput.includes(e.target.value)){
            setContinentsInput(continentsInput.filter(el => el!==e.target.value))
        }
    }

    function toggleAlLContinents(e){
        e.target.checked ? setAllContinentsSelected(true) : setAllContinentsSelected(false)
    }

    function validateSettings() {
        setNumberOfCountries(countriesInput)
        if(allContinentsSelected || continentsInput.length === 0){
            setContinentsSelected(['All'])
        } else{
            setContinentsSelected(continentsInput)
        }
    }

    return (
        <>
            <Modal
                buttonCaption="GAME SETTINGS"
                buttonId="settings-btn"
                title="Game Settings"
                modalId='settings__modal'
                okCallback={validateSettings}
                content={
                    <div className="settings__content">
                        <div className="settings__form-field">
                            <label htmlFor="countries">How many countries do you want to guess?</label>
                            <input type="number" value={countriesInput} onChange={(e) => nCountriesChange(e)} name="countries" />
                        </div>
                        <div className="settings__form-field">
                            <legend>Continent</legend>
                            <div className="settings__continent-list">
                                <div className="settings__continent-item">
                                    <input type="checkbox" name="continent" value="All" onChange={(e) => toggleAlLContinents(e)} />
                                    <label htmlFor="All">All</label>
                                </div>
                                <div className="settings__continent-item">
                                    <input type="checkbox" name="continent" value="Africa" onChange={(e) => continentChange(e)} disabled={allContinentsSelected}/>
                                    <label htmlFor="Africa">Africa</label>
                                </div>
                                <div className="settings__continent-item">
                                    <input type="checkbox" name="continent" value="Antartica" onChange={(e) => continentChange(e)} disabled={allContinentsSelected} />
                                    <label htmlFor="Antartica">Antartica</label>
                                </div>
                                <div className="settings__continent-item">
                                    <input type="checkbox" name="continent" value="Asia" onChange={(e) => continentChange(e)} disabled={allContinentsSelected} />
                                    <label htmlFor="Asia">Asia</label>
                                </div>
                                <div className="settings__continent-item">
                                    <input type="checkbox" name="continent" value="Europe" onChange={(e) => continentChange(e)} disabled={allContinentsSelected} />
                                    <label htmlFor="Europe">Europe</label>
                                </div>
                                <div className="settings__continent-item">
                                    <input type="checkbox" name="continent" value="North America" onChange={(e) => continentChange(e)} disabled={allContinentsSelected} />
                                    <label htmlFor="North America">North America</label>
                                </div>
                                <div className="settings__continent-item">
                                    <input type="checkbox" name="continent" value="Oceania" onChange={(e) => continentChange(e)} disabled={allContinentsSelected} />
                                    <label htmlFor="Oceania">Oceania</label>
                                </div>
                                <div className="settings__continent-item">
                                    <input type="checkbox" name="continent" value="South America" onChange={(e) => continentChange(e)} disabled={allContinentsSelected} />
                                    <label htmlFor="South America">South America</label>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default Settings