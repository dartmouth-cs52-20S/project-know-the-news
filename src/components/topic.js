/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchTopic } from '../actions/index';

function mapStateToProps(reduxState) {
  console.log(reduxState);
  return {
    currentTopic: reduxState.topics.current,
  };
}

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.fetchTopic(this.props.match.params.topicID);
  }

  linksList() {
    const links = this.props.currentTopic.articles.map((article) => {
      return (
        <li id="link-item-parent">
          <a href={article.link} id="link-item" target="_blank">{article.title}</a>
          <p id="article-description">{article.link}</p>
        </li>
      );
    });
    return links;
  }

  linksListSourceMap() {
    const links = this.props.currentTopic.articles.map((article) => {
      return (
        <div id="source-box">
          <a href={article.link} id="source-item" target="_blank">{article.title}</a>
        </div>
      );
    });
    return links;
  }

  // eslint-disable-next-line class-methods-use-this
  renderTitle() {
    console.log(this.props.currentTopic);
    return (
      <div id="topic-title">
        {this.props.currentTopic.title}
      </div>
    );
  }

  renderTopicPage() {
    return (
      <div id="topic-container">
        <h2 id="source-map-title">Source Sentiment Map</h2>
        <div id="source-map-container">
          <div id="source-map-inner-box">
            {this.linksListSourceMap()}
          </div>
          <div id="meter-key">
            <h3>Negative</h3>
            <h3>Neutral</h3>
            <h3>Positive</h3>
          </div>
        </div>
        <h3 id="source-map-title">Article List</h3>
        <div id="article-list-container">
          <div id="sources">
            <ul>
              {this.linksList()}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.currentTopic) {
      return (
        <div>
          Loading
        </div>
      );
    } else if (!this.props.currentTopic.title) {
      return (
        <div>
          Loading
        </div>
      );
    } else {
      return (
        <div className="topic-parent">
          <div>
            {this.renderTitle()}
          </div>
          <div>
            {this.renderTopicPage()}
          </div>
        </div>
      );
    }
  }
}

// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default withRouter(connect(mapStateToProps, { fetchTopic })(Topic));
