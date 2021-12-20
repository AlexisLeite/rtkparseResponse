import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./styles.css";
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
