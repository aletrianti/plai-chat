import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../../actions/actionsAuth';
import { clearProfile } from '../../../actions/actionsProfile';

class Navbar extends Component {
  onLogout(e) {
    e.preventDefault();
    this.props.clearProfile();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const loggedIn = (
      <div>
        <Link className="navbar-btn" to="/dashboard">Dashboard</Link>
        <Link className="navbar-btn" to="/profile">Profile</Link>
        
        <span className="navbar-btn" onClick={this.onLogout.bind(this)}>Logout</span>
      </div>  
    );

    const loggedOut = (
      <Link className="navbar-btn" to="/login">Login</Link>
    );
    
    return (
      <nav className="app-navbar">
        <Link className="navbar-btn" to="/">
          <img src="" alt="Plai logo"/>
        </Link>

        { isAuthenticated ? loggedIn : loggedOut }
      </nav>
    )
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const stateProps = (state) => ({
  auth: state.auth
});

export default connect(stateProps, { logout, clearProfile })(Navbar);