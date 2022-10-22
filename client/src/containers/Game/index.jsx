import React from "react";
import './game.css'
import CountryHints from "../../components/CountryHints/CountryHints";
import GuessedForm from "../../components/GuessForm/GuessForm";
import ScoreBoard from "../../components/ScoreBoard/ScoreBoard";
import Map from "../../components/Map/Map";
import CountriesTable from "../../components/CountriesTable/CountriesTable";
import { usePlayerSettings } from "../../hooks/usePlayerSettings";


const Game = () => {

    const {numberOfCountries, setNumberOfCountries, continentsSelected, setContinentsSelected} = usePlayerSettings()
    console.log(continentsSelected)

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