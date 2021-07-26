import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers/rootReducer";
import App from "./App";
import "./assets/scss/style.scss";
import * as serviceWorker from "./serviceWorker";
import { ToastProvider, DefaultToastContainer } from "react-toast-notifications";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const MyCustomToastContainer = props => (
    <DefaultToastContainer {...props} style={{ zIndex: 9999 }} />
);
const TOAST_COMPONENTS = { ToastContainer: MyCustomToastContainer }

ReactDOM.render(
  <Provider store={store}>
      <ToastProvider components={TOAST_COMPONENTS}>
         <App />
      </ToastProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
