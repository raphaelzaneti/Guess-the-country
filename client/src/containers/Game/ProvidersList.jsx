import React from "react";
import { HintsProvider} from "../../components/CountryHints/newHint";
import { ProviderGuessedCountry } from "./guessedCountry";
import { CorrectProvider, CountriesArrayProvider } from '../../components/validationCountry/validateCountry'
import ScoreProvider from "../../components/ScoreBoard/scoreCount";
import CountryProvider from "../../components/CountryHints/useCountry";


export default function ProviderList(props) {
    return (

        <HintsProvider>
            <CorrectProvider>
                <ProviderGuessedCountry>
                    <CountryProvider>
                        <ScoreProvider>
                            <CountriesArrayProvider>
                                {props.children}
                            </CountriesArrayProvider>
                        </ScoreProvider>
                    </CountryProvider>
                </ProviderGuessedCountry>
            </CorrectProvider>
        </HintsProvider>
    )
}