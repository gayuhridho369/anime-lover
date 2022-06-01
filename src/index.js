import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ProviderApollo from "./graphql/ProviderAppolo";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ProviderApollo>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProviderApollo>
  // </React.StrictMode>
);
