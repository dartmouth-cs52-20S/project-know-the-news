import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { fetchPosts } from '../actions/index';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  postsList = () => {
    const posts = this.props.posts.map((post) => {
      return (
        <li key={post.id} className="postItem">
          <NavLink to={`posts/${post.id}`} exact id="link">
            <Typography id="postTitle" variant="h4" component="h2">
              {post.articleTitle}
            </Typography>
            <Typography id="postTag" variant="subtitle1" component="h2" gutterBottom>
              {post.keywords}
            </Typography>
          </NavLink>
        </li>
      );
    });
    return posts;
  }

  render() {
    return (
      <ul id="posts">
        {this.postsList()}
      </ul>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    posts: reduxState.posts.all,
  };
}

export default connect(mapStateToProps, { fetchPosts })(Posts);
