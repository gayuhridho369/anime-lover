import React from "react";
import { Route, Routes } from "react-router-dom";
import AnimeCollection from "../pages/AnimeCollection";
import AnimeDetail from "../pages/AnimeDetail";
import AnimeList from "../pages/AnimeList";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<AnimeList />} />
      <Route path="/anime/page/:pageNumber" element={<AnimeList />} />
      <Route path="/anime/:id/detail" element={<AnimeDetail />} />
      <Route path="/anime/collection" element={<AnimeCollection />} />
    </Routes>
  );
}

export default Router;
