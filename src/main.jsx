import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { DARK } from "./util/constants.js";
import { Provider } from "react-redux";
import { store } from "./redux/stores/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <main className={`${DARK}`}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </main>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>
);
