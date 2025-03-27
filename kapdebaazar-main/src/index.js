import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/usercontext";
import { CategoriesProvider } from "./contexts/CategoriesContext";
import { CartProvider } from "./contexts/CartContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
             <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
