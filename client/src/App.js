import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { currentUser, logout } from './actions/actionsAuth';
import { clearProfile } from './actions/actionsProfile';

import './App.css';

// Import components
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Landing from './components/Landing/Landing';
import Login from './components/forms/auth/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import CreateProfile from './components/forms/CreateProfile/CreateProfile';
import EditProfile from './components/forms/EditProfile/EditProfile';

// Check for token
// If there is a token, set it to the Auth header, decode it and get user info, and set authenticated user
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decodedData = jwt_decode(localStorage.jwtToken);
  store.dispatch(currentUser(decodedData));

  // If the token expires, log the user out, clear the profile and redirect to the login page
  const now = Date.now() / 1000;
  if (decodedData.exp < now) {
    store.dispatch(logout());
    store.dispatch(clearProfile());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ Landing } />
            <Route exact path="/login" component={ Login } />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={ Dashboard } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/profile/:user_id" component={ Profile } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
