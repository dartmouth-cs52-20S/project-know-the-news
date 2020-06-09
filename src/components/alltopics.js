/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { fetchTopics } from '../actions/index';

class AllTopics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      // filteredTopics: [],
    };

    // this.filteredTopics = this.filteredTopics.bind(this);
  }

  componentDidMount() {
    this.props.fetchTopics();
  }

  searchValueChange = (event) => {
    this.setState({ searchValue: event.target.value });
  }

  topicsList = () => {
    if (this.state.searchValue === '') {
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
    } else {
      const topics = this.props.topics.map((topic) => {
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
      });
      return topics;
    }
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
            <TextField id="outlined-search"
              label="Search Topics"
              type="search"
              variant="outlined"
              value={this.state.searchValue}
              onChange={this.searchValueChange}
            />
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
  return {
    topics: reduxState.topics.all,
  };
}

export default connect(mapStateToProps, { fetchTopics })(AllTopics);

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
