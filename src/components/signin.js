import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { signinUser } from '../actions/index';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', password: '', username: '',
    };
  }

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  handleSubmit = (event) => {
    this.props.signinUser(this.state, this.props.history);
  }

  render() {
    return (
      <div id="signInPage">
        <Typography variant="h4" id="header">Sign in</Typography>
        <input className="fields" placeholder="Username" value={this.state.username} onChange={this.handleChangeUsername} />
        <input className="fields" placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail} />
        <input className="fields" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} />
        <Link component={NavLink} to="/signup">Don&apos;t have an account? Sign up here!</Link>
        <Button variant="contained" color="default" onClick={this.handleSubmit}>Sign In</Button>
      </div>
    );
  }
}

export default connect(null, { signinUser })(Signup);
