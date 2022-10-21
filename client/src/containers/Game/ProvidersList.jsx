import React from "react";
import { ProviderGuessedCountry } from "./guessedCountry";
import { CorrectProvider, CountriesArrayProvider } from '../../components/validationCountry/validateCountry'
import ScoreProvider from "../../components/ScoreBoard/scoreCount";
import CountryProvider from "../../components/CountryHints/useCountry";


export default function ProviderList(props) {
    return (
        <>
            {props.children}
        </>
    )
}