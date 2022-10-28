import React, { useEffect } from "react";
import './game.css'
import CountryHints from "../../components/CountryHints/CountryHints";
import GuessedForm from "../../components/GuessForm/GuessForm";
import ScoreBoard from "../../components/ScoreBoard/ScoreBoard";
import Map from "../../components/Map/Map";
import CountriesTable from "../../components/CountriesTable/CountriesTable";
import { usePlayerSettings } from "../../hooks/usePlayerSettings";
import axios from "axios";


const Game = () => {

    const {numberOfCountries, setNumberOfCountries, continentsSelected, setContinentsSelected} = usePlayerSettings()
    console.log(continentsSelected)

    if(numberOfCountries > 0){
        axios.post('http://localhost:3001/countries/set-countries', {params: {countries: numberOfCountries}})
                .then(res => res.data)
                .then(data => console.log(data))
    }

    return (
        <section id="game-play" className="game-play">

            <div id="game-board" className="game-play__board">
                <GuessedForm />

                <div id="country-data">
                    <CountryHints />
                    <ScoreBoard />
                    <CountriesTable />
                </div>

            </div>
            <Map />

        </section>

    )
}

export default Game