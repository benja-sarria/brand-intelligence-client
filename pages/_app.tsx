// Bootstrap css
import "bootstrap/dist/css/bootstrap.css";

// Custom CSS
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NiceClassProvider } from "../context/NiceClassProvider";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <NiceClassProvider>
            <Component {...pageProps} />
        </NiceClassProvider>
    );
}

export default MyApp;
