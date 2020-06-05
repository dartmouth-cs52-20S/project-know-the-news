/* eslint-disable no-lonely-if */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { fetchTopic, deleteTopic, unattachTopic } from '../actions/index';

function mapStateToProps(reduxState) {
  return {
    currentTopic: reduxState.topics.current,
  };
}

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserSure: false,
    };
  }

  componentDidMount() {
    this.props.fetchTopic(this.props.match.params.topicID);
  }

  handleDeleteClick = () => {
    this.props.deleteTopic(this.props.match.params.topicID, this.props.history);
  }

  handleUnattachClick = () => {
    this.setState({ isUserSure: true });
    this.forceUpdate();
  }

  handleYesClick = () => {
    this.props.unattachTopic(this.props.match.params.topicID, this.props.history);
    this.setState({ isUserSure: false });
  }

  handleNoClick = () => {
    this.setState({ isUserSure: false });
    this.forceUpdate();
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
    return (
      <div id="topic-title">
        {this.props.currentTopic.title}
      </div>
    );
  }

  renderTopicPage() {
    // return page with ability to anonimize user
    return (
      <div>
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

  renderTopicPageFooter() {
    // dont give user ability to anonimize post because its not their post
    if (this.props.currentTopic.authorUsername !== localStorage.getItem('currentUser')) {
      return (
        <div className="topic-page-footer">
          <div className="topic-author">
            {`Topic created by: ${this.props.currentTopic.authorUsername}`}
          </div>
        </div>

      );
    } else {
      // give user ability to anonimize post because its their post
      if (!this.state.isUserSure) {
        return (
          <div className="topic-page-footer">
            <div className="topic-author">
              {`Topic created by: ${this.props.currentTopic.authorUsername}`}
            </div>
            <div className="Dlt-topic-Btn">
              <Button variant="contained" color="secondary" onClick={this.handleUnattachClick}>
                Anonymize Topic
              </Button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="topic-page-footer">
            <Button className="no-Btn" variant="contained" color="primary" onClick={this.handleNoClick}>
              Take me back!
            </Button>
            <Button className="yes-Btn" variant="contained" color="secondary" onClick={this.handleYesClick}>
              Are you sure?
            </Button>
          </div>
        );
      }
    }
  }

  /* <Button variant="contained" color="secondary" onClick={this.handleDeleteClick}>
  Delete topic
</Button> */

  render() {
    if (!this.props.currentTopic) {
      return (
        <div>
          Loading
        </div>
      );
    } if (!this.props.currentTopic.title) {
      return (
        <div>
          Loading
        </div>
      );
    } else {
      console.log(this.props.currentTopic);
      return (
        <div className="topic-parent">
          <div>
            {this.renderTitle()}
          </div>
          <div>
            <div id="topic-container">
              {this.renderTopicPage()}
              {this.renderTopicPageFooter()}
            </div>
          </div>
          <Button variant="contained" color="secondary" onClick={this.handleDeleteClick}>
            Delete topic
          </Button>
        </div>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps, { fetchTopic, deleteTopic, unattachTopic })(Topic));
