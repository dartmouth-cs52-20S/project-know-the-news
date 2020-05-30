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

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  handleSubmit = (event) => {
    this.props.signinUser(this.state, this.props.history);
  }

  render() {
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
}

export default connect(null, { signinUser })(Signup);
