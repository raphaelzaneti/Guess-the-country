import React from "react";
import './game.css'
import CountryHints from "../../components/CountryHints/CountryHints";
import GuessedForm from "../../components/GuessForm/GuessForm";
import ScoreBoard from "../../components/ScoreBoard/ScoreBoard";
import ProviderList from "./ProvidersList";
import Map from "../../components/Map/Map";
import CountriesTable from "../../components/CountriesTable/CountriesTable";


const Game = () => {


    return (
        <ProviderList>

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


        </ProviderList>
    )
}

export default Game