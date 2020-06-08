/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { fetchTopics, fetchTrendingNews } from '../actions/index';


let renderCount = 0;

class Topics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
    };
  }

  componentDidMount() {
    this.props.fetchTopics();
    this.props.fetchTrendingNews();
    renderCount = 0;
  }

  handleSearchValueChange = (event) => {
    this.setState({ searchValue: event.target.value });
  }

  topicsList = () => {
    if (!this.props.auth) {
      return (
        <div className="no-topics-message">
          <div>
            Sign In to view your saved topics! Or Click on View All to view others saved topics.
          </div>
        </div>
      );
    } else if (!this.props.topics) {
      return (
        <div>
          Loading
        </div>
      );
    } else {
      const topics = this.props.topics.map((topic) => {
        if (topic.author.username === localStorage.getItem('currentUser') && this.state.searchValue === '') {
          renderCount += 1;
          return (
            <li key={topic.id} className="postItem">
              <NavLink to={`topics/${topic.id}`} exact id="link">
                <Typography id="postTitle" variant="h4" component="h2">
                  {topic.title}
                </Typography>
                <Typography id="postTag" variant="subtitle1" component="h2" gutterBottom>
                  {topic.keywords}
                </Typography>
              </NavLink>
            </li>
          );
        } else if (topic.author.username === localStorage.getItem('currentUser')) {
          const titleArray = topic.title.split(' ');
          const searchArray = this.state.searchValue.split(' ');
          for (let i = 0; i < searchArray.length; i += 1) {
            for (let j = 0; j < titleArray.length; j += 1) {
              if (searchArray[i].toLowerCase() === titleArray[j].toLowerCase()) {
                return (
                  <li key={topic.id} className="postItem">
                    <NavLink to={`topics/${topic.id}`} exact id="link">
                      <Typography id="postTitle" variant="h4" component="h2">
                        {topic.title}
                      </Typography>
                      <Typography id="postTag" variant="subtitle1" component="h2" gutterBottom>
                        {`Created by: ${topic.authorUsername}`}
                      </Typography>
                    </NavLink>
                  </li>
                );
              }
            }
          }
        } else {
          return (null);
        }
      });
      return topics;
    }
  }

  renderNoTopics = () => {
    if (!this.props.topics || !this.props.auth) {
      return (
        <div>
          Loading
        </div>
      );
    } else if (renderCount === 0) {
      // render if there are no topics attached to the current user
      return (
        <div className="no-topics-message">
          <div>
            You haven&apos;t save any topics :(
          </div>
          <br />
          <div>
            Download Our chrome extension  (https://github.com/dartmouth-cs52-20S/project-other-know-the-news) and save some topics!
            Or go check out other peoples topics by pressing &quot;View All&quot;
          </div>
        </div>
      );
    } else {
      return (null);
    }
  }

  newsList = () => {
    if (!this.props.news) {
      return (
        <div>
          Loading
        </div>
      );
    } else if (!this.props.news.articles) {
      return (
        <div>
          Loading
        </div>
      );
    } else {
      const news = this.props.news.articles.map((article) => {
        return (
          <li key={article.id} className="news-item">
            <a id="news-link" href={article.url} target="_blank">
              <img alt="article" border="0" src={article.urlToImage} />
              <p>{article.description}</p>
            </a>
          </li>
        );
      });
      return news;
    }
  }

  render() {
    return (
      <div id="topics-parent">
        <div id="projName">
          Varify
        </div>
        <div id="inner-page">
          <div id="postsBG">
            <div id="postsBGHead">
              <div id="recent-topics">
                Your Topics
              </div>
              <NavLink id="see-all-btn" className="nav" to="/topics">View All</NavLink>
              <TextField
                id="outlined-search"
                label="Search Topics"
                type="search"
                variant="outlined"
                value={this.state.searchValue}
                onChange={this.handleSearchValueChange}
              />
            </div>
            <ul id="posts">
              {this.topicsList()}
              {this.renderNoTopics()}
            </ul>
          </div>
          <div id="news-feed-parent">
            <div id="trending-news">
              Trending News
            </div>
            <div id="news">
              <ul>
                {this.newsList()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    topics: reduxState.topics.all,
    news: reduxState.news.all,
    auth: reduxState.auth.authenticated,
  };
}

export default connect(mapStateToProps, { fetchTopics, fetchTrendingNews })(Topics);

/* const imgStyle = {
          backgroundImage: `url(${article.urlToImage})`,
          backgroundSize: 'cover',
        };
        return (
          <li key={article.id} style={imgStyle} className="news-item">
            <a id="news-link" href={article.url} target="_blank">
              <image border="0" src={`url(${article.urlToImage})`} width="300" height="300" />
            </a>
          </li>
        ); */
