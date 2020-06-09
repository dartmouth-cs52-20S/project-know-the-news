import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Helmet } from 'react-helmet';
import { signinUser } from '../actions/index';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '', email: '',
    };
  }

  componentDidMount() {
    this.props.auth.error = '';
  }

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  handleSubmit = (event) => {
    console.log(this.props);
    this.props.signinUser(this.state, this.props.history);
    // this.forceUpdate();
  }

  renderSignIn() {
    return (
      <div id="signInPage" className="signIn">
        <Helmet>
          <style>{'body { background-color: #C2DDE6; }'}</style>
        </Helmet>
        <h3 id="header">Varify</h3>
        <TextField className="fields" id="outlined-basic" label="Email" value={this.state.username} onChange={this.handleChangeEmail} variant="outlined" />
        <TextField className="fields" id="outlined-basic" type="password" label="Password" value={this.state.password} onChange={this.handleChangePassword} variant="outlined" />
        <Link className="link" component={NavLink} to="/signup">Don&apos;t have an account? Sign up here!</Link>
        <Button className="button" variant="contained" size="large" onClick={this.handleSubmit}>Sign In</Button>
      </div>
    );
  }

  renderSignInError() {
    return (
      <div id="signInPage" className="signIn">
        <Helmet>
          <style>{'body { background-color: #C2DDE6; }'}</style>
        </Helmet>
        <h3 id="header">Varify</h3>
        <TextField
          error
          className="fields"
          id="outlined-basic"
          label="Email"
          value={this.state.username}
          onChange={this.handleChangeEmail}
          variant="outlined"
          helperText={this.props.auth.error}
        />
        <TextField
          error
          className="fields"
          id="outlined-basic"
          type="password"
          label="Password"
          value={this.state.password}
          onChange={this.handleChangePassword}
          variant="outlined"
          helperText={this.props.auth.error}
        />
        <Link className="link" component={NavLink} to="/signup">Don&apos;t have an account? Sign up here!</Link>
        <Button className="button" variant="contained" size="large" onClick={this.handleSubmit}>Sign In</Button>
      </div>
    );
  }

  render() {
    console.log(this.props.auth.error);
    if (this.props.auth.error === '' || !this.props.auth.error) {
      return (
        <div>
          {this.renderSignIn()}
        </div>
      );
    } else {
      return (
        <div>
          {this.renderSignInError()}
        </div>
      );
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    auth: reduxState.auth,
  };
}

export default connect(mapStateToProps, { signinUser })(Signup);
