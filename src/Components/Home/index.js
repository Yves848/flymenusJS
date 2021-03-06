import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { withAutorization } from '../Session';


class HomePage extends Component {

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
