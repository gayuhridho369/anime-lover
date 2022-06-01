import React, { Fragment } from "react";
import { ThemeProvider } from "@emotion/react";
import { GlobalStyles } from "./themes/GlobalStyles";
import { DefaultTheme } from "./themes/PresetThemes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Router from "./routes/Router";
import { ContextProvider } from "./stores/Context";

function App() {
  return (
    <Fragment>
      <ContextProvider>
        <ThemeProvider theme={DefaultTheme}>
          <GlobalStyles />
          <Navbar />
          <Router />
          <Footer />
        </ThemeProvider>
      </ContextProvider>
    </Fragment>
  );
}

export default App;
