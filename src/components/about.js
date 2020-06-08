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
            <p>
              Our Google Chrome extension provides recommended news sites by searching for related news articles
              based on the current article title using Bing&apos;s News Search API. We then perform sentiment analysis
              on the top search results using IBM Watson&apos;s Natural Processing API, sending back to the user a list of
              news articles that are most similar and dissimilar in sentiment compared to that of the current article. In
              the event that sentiment analysis cannot be performed on the current article--for instance, the API could
              not extract the text on the website--the user will receive a list of articles with the most positive and
              most negative sentiment. Unfortunately, we are not able to access articles behind subscription paywalls beyond
              a preview text snippet on which sentiment analysis is performed.
            </p>
          </div>
          <div className="about-section">
            <h2>Our Commitment to You</h2>
            <p>
              We are comitted to ensuring that our users stay informed despite echo chambers that are ubiquitous across the
              internet. What we do not do, however, is filter out &quot;fake news.&quot; Instead, we leave deciding what constitutes as
              fake news up to the reader--our goal is to simply provide related articles for consideration along with a format
              for discussion and organization.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutPage;
