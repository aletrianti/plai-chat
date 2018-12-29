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
      <div>
        <h1>This is the landing page</h1>

        <div className="left-register-form">
          <Register />
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
