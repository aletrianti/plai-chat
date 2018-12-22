import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <Link className="navbar-btn" to="/">
          <img src="" alt="Plai logo"/>
        </Link>

        <Link className="navbar-btn" to="/login">Login</Link>
      </nav>
    )
  }
}
