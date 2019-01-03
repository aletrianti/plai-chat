import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import './Landing.css';

// Import components
import Register from '../forms/auth/Register/Register';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="app-landing">
        <div className="landing-top">
          <div className="right-landing">
            <h1>Join a community of passionate gamers!</h1>
            <h2>From dev talks to game discussions, Plai Chat has you covered.</h2>
          </div>

          <div className="left-register-form">
            <Register />
          </div>
        </div>  

        <div className="landing-info">
          <div className="info-item">
            <img className="left-image" src="" alt=""/>
            <h4>Stay up to date - with your friends, news and updates.</h4>
            <h5>
              Plai Chat gives you an easy and simple solution to be updated with your friends newest posts as well as updates from developers and publishes directly.
              <br></br>
              <br></br>
              Every week we invite developers from your favourite games to discuss topics from ideas to development.
            </h5>
          </div>
          <div className="info-item">
            <img className="right-image" src="" alt=""/>
            <h4>No distractions, just games.</h4>
            <h5>
              Plai Chat was developed for gamers by gamers. Our team consists of hardcore gamers who know what a true gamer needs. 
              <br></br>
              <br></br>
              Play and talk about your favorite games, show how passionate you are.
            </h5>
          </div>
        </div>

        <div className="landing-sponsors">
          <h3>Engage in a conversation with our developers and publishers.</h3>
          <div className="sponsors">
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>
          </div>
        </div>

        <div className="landing-join">
          <div className="right-landing">
            <h1>Now it is the perfect time to join us!</h1>
            <h2>A fast growing gaming community.</h2>
          </div>

          <div className="left-register-form">
            <Register />
          </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const stateProps = (state) => ({
  auth: state.auth
});

export default connect(stateProps)(Landing);
