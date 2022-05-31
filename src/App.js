import React, { Fragment } from "react";
import { ThemeProvider } from "@emotion/react";
import { GlobalStyles } from "./themes/GlobalStyles";
import { DefaultTheme } from "./themes/PresetThemes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Router from "./routes/Router";

function App() {
  return (
    <Fragment>
      <ThemeProvider theme={DefaultTheme}>
        <GlobalStyles />
        <Navbar />
        <Router />
        <Footer />
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
