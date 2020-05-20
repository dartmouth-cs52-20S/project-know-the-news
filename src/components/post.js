import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
// import marked from 'marked';
// import TextareaAutosize from 'react-textarea-autosize';
import { fetchPost, deletePost, updatePost } from '../actions/index';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      articleTitle: '',
      keywords: '',
      // content: '',
      articleLink: '',
    };
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID);
  }

  handleDelete = () => {
    this.props.deletePost(this.props.currentPost.id, this.props.history);
  }

  handleUpdate = () => {
    this.setState({ isEditing: false });
    const fields = {
      articleTitle: this.state.articleTitle,
      keywords: this.state.keywords,
      // content: this.state.content,
      articleLink: this.state.articleLink,
    };
    this.props.updatePost(this.props.match.params.postID, fields);
  }

  renderTitle = () => {
    if (!this.state.isEditing) {
      return (
        <Typography variant="h2" id="title">
          {this.props.currentPost.articleTitle}
        </Typography>
      );
    } else {
      return <input className="titleBox" placeholder="Title" onChange={this.onTitleChange} value={this.state.articleTitle} />;
    }
  }

  onTitleChange = (event) => {
    this.setState({ articleTitle: event.target.value });
  }

  renderTags = () => {
    if (!this.state.isEditing) {
      return (
        <Typography variant="caption" id="tags">
          keywords: {this.props.currentPost.keywords}
        </Typography>
      );
    } else {
      return <input className="tagsBox" placeholder="Tags" onChange={this.onTagsChange} value={this.state.keywords} />;
    }
  }

  onTagsChange = (event) => {
    this.setState({ keywords: event.target.value });
  }

  // renderContent = () => {
  //   if (!this.state.isEditing) {
  //     return (
  //       // eslint-disable-next-line react/no-danger
  //       <div id="content" dangerouslySetInnerHTML={{ __html: marked(this.props.currentPost.content || '') }} />
  //     );
  //   } else {
  //     return <TextareaAutosize className="contentBox" placeholder="Comments (Markdown Supported)" onChange={this.onContentChange} value={this.state.content} />;
  //   }
  // }

  // onContentChange = (event) => {
  //   this.setState({ content: event.target.value });
  // }

  renderCoverUrl = () => {
    if (!this.state.isEditing) {
      return (
        <Link href={this.props.currentPost.articleLink}>
          Article URL: {this.props.currentPost.articleLink}
        </Link>
      );
    } else {
      return <input className="coverUrlBox" placeholder="Cover URL" onChange={this.onCoverUrlChange} value={this.state.articleLink} />;
    }
  }

  onCoverUrlChange = (event) => {
    this.setState({ articleLink: event.target.value });
  }

  toggleEdit = () => {
    this.setState({
      isEditing: true,
      articleTitle: this.props.currentPost.articleTitle,
      keywords: this.props.currentPost.keywords,
      // content: this.props.currentPost.content,
      articleLink: this.props.currentPost.articleLink,
    });
  }

  renderButton = () => {
    if (this.state.isEditing) {
      return (
        <IconButton aria-label="save" onClick={this.handleUpdate}>
          <SaveIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton aria-label="edit" onClick={this.toggleEdit}>
          <EditIcon />
        </IconButton>
      );
    }
  }

  render() {
    console.log(this.props.currentPost.authorName);
    return (
      <div>
        <div id="post">
          {this.renderTitle()}
          {this.renderTags()}
          {/* {this.renderContent()} */}
          {this.renderCoverUrl()}
          <Typography variant="caption" id="tags">
            Posted by: {this.props.currentPost.authorName}
          </Typography>
          <div id="buttons">
            <IconButton aria-label="delete" onClick={this.handleDelete}>
              <DeleteIcon />
            </IconButton>
            {this.renderButton()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    currentPost: reduxState.posts.current,
  };
}

// enables this.props.currentPost
// and this.props.fetchPost, this.props.deletePost, and this.props.updatePost
export default connect(mapStateToProps, { fetchPost, deletePost, updatePost })(withRouter(Post));
