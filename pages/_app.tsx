// Bootstrap css
import "bootstrap/dist/css/bootstrap.css";

// Custom CSS
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
