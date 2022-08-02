import Hello from "../containers/Hello/Hello";
import HintsProvider from '../hooks/useHints'

function Providers() {
    return (
        <>
            <HintsProvider>
                <Hello />
            </HintsProvider>
        </>
    );
}

export default Providers;
