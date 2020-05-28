import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { fetchTopics } from '../actions/index';

class Topics extends Component {
  componentDidMount() {
    this.props.fetchTopics();
  }

  topicsList = () => {
    const topics = this.props.topics.map((topic) => {
      return (
        <li key={topic.id} className="postItem">
          <NavLink to={`posts/${topic.id}`} exact id="link">
            <Typography id="postTitle" variant="h4" component="h2">
              {topic.articleTitle}
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

  render() {
    return (
      <div>
        <div id="projName">
          Varify
        </div>
        <div id="postsBG">
          <div id="postsBGHead">
            <div>
              Recent Topics
            </div>
            <TextField id="outlined-search" label="Search Topics" type="search" variant="outlined" />
          </div>
          <ul id="posts">
            {this.topicsList()}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  console.log(reduxState);
  return {
    topics: reduxState.posts.all,
  };
}

export default connect(mapStateToProps, { fetchTopics })(Topics);
