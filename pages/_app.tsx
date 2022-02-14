import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  <Head>
    <title>MyTop</title>
  </Head>;
  return <Component {...pageProps} />;
}

export default MyApp;
