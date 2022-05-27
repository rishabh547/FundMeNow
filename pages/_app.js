import { useState } from 'react';
import "../styles/globals.css";
import "../styles/nprogress.css";
import Router from "next/router";
import nProgress from "nprogress";
import { ToastProvider } from 'react-toast-notifications';
import AppContext from "../context/AppContext";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {

  const [address, setAddress] = useState(null);

  return (
    <ToastProvider>
      <AppContext.Provider
        value={{
          state: {
            address: address
          },
          setAddress: setAddress
        }}
      >
        <Component {...pageProps} />
      </AppContext.Provider>
    </ToastProvider>
  )
}
