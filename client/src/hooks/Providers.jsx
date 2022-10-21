import Hello from "../containers/Hello/Hello";
import HintsProvider from '../hooks/useHints'
import { CorrectProvider } from "../components/validationCountry/validateCountry";
import { ProviderGuessedCountry } from "../containers/Game/guessedCountry";
import CountryProvider from "../components/CountryHints/useCountry";
import ScoreProvider from "../components/ScoreBoard/scoreCount";
import { CountriesArrayProvider } from "../components/validationCountry/validateCountry";

function Providers() {
    return (
        <>
            <HintsProvider>
                <CorrectProvider>
                    <ProviderGuessedCountry>
                        <CountryProvider>
                            <ScoreProvider>
                                <CountriesArrayProvider>
                                    <Hello />
                                </CountriesArrayProvider>
                            </ScoreProvider>
                        </CountryProvider>
                    </ProviderGuessedCountry>
                </CorrectProvider>
            </HintsProvider>
        </>
    );
}

export default Providers;
