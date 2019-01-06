import React, { Component } from 'react';

import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <div className="left-footer">
          <img src={require("../../../assets/images/Logo.svg")} alt="Plai logo" />
          <span>Made with love in Denmark - from gamers to gamers.</span>
        </div>
        <div className="right-footer">
          <span>Copyright 2018-2019</span>
        </div>
      </footer>
    )
  }
}
