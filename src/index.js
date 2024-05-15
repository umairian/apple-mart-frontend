import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "font-awesome/css/font-awesome.min.css";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-center"
        closeButton={true}
        autoClose={true}
        closeOnClick={false}
        newestOnTop={true}
        limit={1}
        className="toast-container"
      />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
