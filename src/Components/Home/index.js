import React, { Component } from 'react'
import {withAutorization} from '../Session';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in User.</p>
  </div>
)

const condition = authUser => !!authUser;

export default withAutorization(condition)(HomePage);