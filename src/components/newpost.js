import React, { Component } from 'react';
import { connect } from 'react-redux';
// import TextareaAutosize from 'react-textarea-autosize';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { createPost } from '../actions/index';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleTitle: '',
      // content: '',
      articleLink: '',
      keywords: '',
    };
  }

  handleChangeTitle = (event) => {
    this.setState({ articleTitle: event.target.value });
  }

  handleChangeTags = (event) => {
    this.setState({ keywords: event.target.value });
  }

  // handleChangeContent = (event) => {
  //   this.setState({ content: event.target.value });
  // }

  handleChangeCover = (event) => {
    this.setState({ articleLink: event.target.value });
  }

  handleSave = () => {
    this.props.createPost(this.state, this.props.history);
  }

  handleDelete = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div id="post">
        <input className="titleBox" placeholder="Article Title" value={this.state.articleTitle} onChange={this.handleChangeTitle} />
        <input className="tagsBox" placeholder="Keywords" value={this.state.keywords} onChange={this.handleChangeTags} />
        {/* <TextareaAutosize className="contentBox" placeholder="Comments (Markdown Supported)" value={this.state.content} onChange={this.handleChangeContent} /> */}
        <input className="coverUrlBox" placeholder="Article URL" value={this.state.articleLink} onChange={this.handleChangeCover} />
        <div id="buttons">
          <IconButton aria-label="delete" onClick={this.handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="save" onClick={this.handleSave}>
            <SaveIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default connect(null, { createPost })(Post);
