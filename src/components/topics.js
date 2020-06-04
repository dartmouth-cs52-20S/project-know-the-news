/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { fetchTopics, fetchTrendingNews } from '../actions/index';

class Topics extends Component {
/*   constructor(props) {
    super(props);

    this.state = {
      filteredTopics: [],
    };

    this.filteredTopics = this.filteredTopics.bind(this);
  } */

  componentDidMount() {
    this.props.fetchTopics();
    this.props.fetchTrendingNews();
  }

  topicsList = () => {
    // if (document.getElementById('outlined-search') === '') {
    // this.filteredTopics = this.props.topics.map((topic) => {
    if (!this.props.topics) {
      return (
        <div>
          Loading
        </div>
      );
    } else {
      const topics = this.props.topics.map((topic) => {
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
      });
      return topics;
    }
    /*    }  else {
      this.filteredTopics = this.props.topics.map((topic) => {
        console.log(topic.links[0]);
        return (
          <li key={topic.id} className="postItem">
            <NavLink to={`posts/${topic.id}`} exact id="link">
              <Typography id="postTitle" variant="h4" component="h2">
                {topic.links[0]}
              </Typography>
              <Typography id="postTag" variant="subtitle1" component="h2" gutterBottom>
                {topic.keywords}
              </Typography>
            </NavLink>
          </li>
        );
      });
    } */
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
    console.log(this.props);
    return (
      <div id="topics-parent">
        <div id="projName">
          Varify
        </div>
        <div id="inner-page">
          <div id="postsBG">
            <div id="postsBGHead">
              <div id="recent-topics">
                Saved Topics
              </div>
              <NavLink id="see-all-btn" className="nav" to="/topics">View All</NavLink>
              <TextField id="outlined-search" label="Search Topics" type="search" variant="outlined" />
            </div>
            <ul id="posts">
              {/* {this.filteredTopics} */}
              {this.topicsList()}
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
  // console.log(reduxState);
  return {
    topics: reduxState.topics.all,
    news: reduxState.news.all,
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
