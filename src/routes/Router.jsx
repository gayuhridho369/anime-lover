import React from "react";
import { Route, Routes } from "react-router-dom";
import AnimeDetail from "../pages/AnimeDetail";
import AnimeList from "../pages/AnimeList";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<AnimeList />} />
      <Route path="/anime/page/:pageNumber" element={<AnimeList />} />
      <Route path="/anime/:id/detail" element={<AnimeDetail />} />
    </Routes>
  );
}

export default Router;
