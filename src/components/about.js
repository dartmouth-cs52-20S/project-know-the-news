/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class AboutPage extends Component {
  render() {
    return (
      <div className="page-container">
        <div id="left-side">
          <h1>About</h1>
        </div>
        <div id="right-side">
          <div className="about-section">
            <h2>Our Purpose</h2>
            <p>
              In an era of extreme political polarization, social media often becomes an echo
              chamber. Instead of looking at an issue from various perspectives, we have fixated
              on a single system of beliefs. Our purpose is to promote unity through mutual respect.
              In order to reduce the crippling polarization, we need to be willing to look at issues
              from the other side.
            </p>
          </div>
          <div className="about-section">
            <h2>Recommendation Methodology</h2>
            <p>Filler text...</p>
          </div>
          <div className="about-section">
            <h2>Our Commitment to You</h2>
            <p>
              We are comitted to...
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutPage;
