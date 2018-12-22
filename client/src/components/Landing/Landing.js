import React, { Component } from 'react';
import './Landing.css';

// Import components
import Register from '../forms/auth/Register/Register';

export default class Landing extends Component {
  render() {
    return (
      <div>
        <h1>This is the landing page</h1>

        <div className="left-register-form">
          <Register />
        </div>
      </div>
    )
  }
}
