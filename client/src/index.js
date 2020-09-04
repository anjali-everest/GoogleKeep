import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./Pages/store/index";

import App from "./App.jsx";
import "./styles/styles.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
