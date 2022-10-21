import Hello from "../containers/Hello/Hello";
import HintsProvider from '../hooks/useHints'
import { CorrectProvider } from "../components/validationCountry/validateCountry";
import { ProviderGuessedCountry } from "../containers/Game/guessedCountry";
import CountryProvider from "../components/CountryHints/useCountry";
import ScoreProvider from "../components/ScoreBoard/scoreCount";
import { CountriesArrayProvider } from "../components/validationCountry/validateCountry";
import PlayerSettingsProvider from "./usePlayerSettings";

function Providers() {
    return (
        <>
            <PlayerSettingsProvider>
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
            </PlayerSettingsProvider>
        </>
    );
}

export default Providers;
