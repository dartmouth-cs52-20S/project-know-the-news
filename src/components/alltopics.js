import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { fetchTopics } from '../actions/index';

class AllTopics extends Component {
/*   constructor(props) {
    super(props);

    this.state = {
      filteredTopics: [],
    };

    this.filteredTopics = this.filteredTopics.bind(this);
  } */

  componentDidMount() {
    this.props.fetchTopics();
  }

  topicsList = () => {
    // if (document.getElementById('outlined-search') === '') {
    // this.filteredTopics = this.props.topics.map((topic) => {
    const topics = this.props.topics.map((topic) => {
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
    });
    return topics;
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

  render() {
    return (
      <div id="topics-parent">
        <div id="projName">
          Topics
        </div>
        <div id="postsBG">
          <div id="postsBGHead">
            <div id="recent-topics">
              All Topics
            </div>
            <TextField id="outlined-search" label="Search Topics" type="search" variant="outlined" />
          </div>
          <ul id="posts">
            {/* {this.filteredTopics} */}
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
    topics: reduxState.topics.all,
  };
}

export default connect(mapStateToProps, { fetchTopics })(AllTopics);
