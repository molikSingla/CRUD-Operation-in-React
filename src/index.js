import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Store } from "./context/Store";
import { CookiesProvider } from "react-cookie";
import "./css/input.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <CookiesProvider>
        <Store>
            <App />
        </Store>
    </CookiesProvider>
);
