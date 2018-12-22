import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

// Import components
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Landing from './components/Landing/Landing';
import Login from './components/forms/auth/Login/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={ Landing } />
          <div className="auth-container">
            <Route exact path="/login" component={ Login } />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
