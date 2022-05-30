import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { GlobalStyles } from "./themes/GlobalStyles";
import { ThemeProvider } from "@emotion/react";
import { defaultTheme } from "./themes/ModeThemes";
import Navbar from "./components/Navbar";
import AnimeDetail from "./pages/AnimeDetail";
import AnimeList from "./pages/AnimeList";

function App() {
  return (
    <Fragment>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Navbar />
        <Routes>
          <Route path="/" element={<AnimeList />} />
          <Route path="/anime/page/:pageNumber" element={<AnimeList />} />
          <Route path="/anime/:id/detail" element={<AnimeDetail />} />
        </Routes>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
