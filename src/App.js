import React, { Component } from "react";
import "./App.css";
import Logo from "./Assest/Images/Icon256.png";
import Button from "@material-ui/core/Button";
import AppMenu from "../src/Components/Menus/AppMenu";
import { FirebaseContext } from "./Components/Firebase";

class App extends Component {
  render() {
    return (
      <div className="App">
        <FirebaseContext.Consumer>
          {firebase => {
            return <div>
              I've access to Firebase
              
            </div>;
          }}
        </FirebaseContext.Consumer>
        <AppMenu />
      </div>
    );
  }
}

export default App;
