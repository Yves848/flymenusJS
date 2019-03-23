import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withAutorization } from '../Session';
import Plats from "../Plats"

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <h1>Home Page</h1>
          <p>The Home Page is accessible by every signed in User.</p>
        </div>
      </Router>
    );
  }
}

const condition = authUser => !!authUser;

export default withAutorization(condition)(HomePage);
