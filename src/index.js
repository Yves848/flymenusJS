import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";

import Firebase, { FirebaseContext } from "./Components/Firebase";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  direction: (navigator.language === "ar" ? "rtl" : "ltr")
});

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
