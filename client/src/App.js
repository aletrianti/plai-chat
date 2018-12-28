import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

// Import components
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Landing from './components/Landing/Landing';
import Login from './components/forms/auth/Login/Login';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ Landing } />
            <Route exact path="/login" component={ Login } />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
