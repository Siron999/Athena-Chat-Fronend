import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { ContextProvider } from "../context/MainContext";
import Error from "./error";

function MyApp({ Component, pageProps }) {
  if (pageProps.error) {
    return <Error title={pageProps.error.title} message={pageProps.error.message} />;
  }
  return (
    <>
      <Head>
        <title>Athena Chat</title>
        <meta name="description" content="Athena Chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ReactNotifications />
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </>
  );
}

export default MyApp;
