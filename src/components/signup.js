import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Helmet } from 'react-helmet';
import { signupUser } from '../actions/index';
import { PrettoSlider, marks } from '../helpers/sliders';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      npassword: '',
      username: '',
      samePword: true,
      continue: false,
      voterValue: '',
    };
  }

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  handleChangeCheckPassword = (event) => {
    this.setState({ npassword: event.target.value });
  }

  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  }

  handleContinue = (event) => {
    if (this.state.password === this.state.npassword) {
      console.log('nice');
      this.setState({ continue: true });
      this.forceUpdate();
      // this.props.signupUser(this.state, this.props.history);
    } else {
      this.setState({
        password: '',
        npassword: '',
        samePword: false,
      });
      this.forceUpdate();
    }
  }

  handleSliderDrag = (event, val) => {
    this.setState({ voterValue: val });
    console.log(this.state.voterValue);
  }

  render() {
    if (!this.state.continue) {
      if (this.state.samePword) {
        return (
          <div id="signUpPage">
            <Helmet>
              <style>{'body { background-color: #C2DDE6; }'}</style>
            </Helmet>
            <h3 id="header">Varify</h3>
            <TextField className="fields" id="outlined-basic" label="Email" value={this.state.email} onChange={this.handleChangeEmail} variant="outlined" />
            <TextField className="fields" id="outlined-basic" label="Username" value={this.state.username} onChange={this.handleChangeUsername} variant="outlined" />
            <TextField className="fields" id="outlined-basic" type="password" label="Password" value={this.state.password} onChange={this.handleChangePassword} variant="outlined" />
            <TextField className="fields" id="outlined-basic" type="password" label="Re-Type Password" value={this.state.npassword} onChange={this.handleChangeCheckPassword} variant="outlined" />
            <div id="bottomSignUp">
              <Link className="link" component={NavLink} to="/signin">Already have an account?</Link>
              <Button className="button" variant="contained" size="large" onClick={this.handleContinue}>Continue</Button>
            </div>
          </div>
        );
      } else {
        return (
          <div id="signUpPage">
            <Helmet>
              <style>{'body { background-color: #C2DDE6; }'}</style>
            </Helmet>
            <h3 id="header">Varify</h3>
            <TextField className="fields" id="outlined-basic" label="Email" value={this.state.email} onChange={this.handleChangeEmail} variant="outlined" />
            <TextField className="fields" id="outlined-basic" label="Username" value={this.state.username} onChange={this.handleChangeUsername} variant="outlined" />
            <TextField className="fields" id="outlined-basic" type="password" label="Password" value={this.state.password} onChange={this.handleChangePassword} variant="outlined" />
            <TextField error
              className="fields"
              id="outlined-basic"
              type="password"
              label="Re-Type Password"
              value={this.state.npassword}
              onChange={this.handleChangeCheckPassword}
              variant="outlined"
              helperText="Incorrect Re-Type Password."
            />
            <div id="bottomSignUp">
              <Link className="link" component={NavLink} to="/signin">Already have an account?</Link>
              <Button className="button" variant="contained" size="large" onClick={this.handleContinue}>Continue</Button>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div id="signUpPage">
          <Helmet>
            <style>{'body { background-color: #C2DDE6; }'}</style>
          </Helmet>
          <h3 id="header">Varify</h3>
          <h5>Tell us a few more things about yourself for a better user experience.</h5>
          <h6>Not comfortable answering? Just press Sign Up!</h6>
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={50}
            onChange={this.handleSliderDrag}
            track={false}
            step={25}
            marks={marks}
          />
          <div id="bottomSignUp">
            <Link className="link" component={NavLink} to="/signin">Already have an account?</Link>
            <Button className="button" variant="contained" size="large" onClick={this.handleSubmit}>Sign Up!</Button>
          </div>
        </div>
      );
    }
  }
}

export default connect(null, { signupUser })(Signup);

/* <div id="credentials">
        <Typography variant="h4" id="header">Sign up</Typography>
        <input className="fields" placeholder="Username" value={this.state.username} onChange={this.handleChangeUsername} />
        <input className="fields" placeholder="Email" value={this.state.email} onChange={this.handleChangeEmail} />
        <input className="fields" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} />
        <Link component={NavLink} to="/signin">Already have an account? Sign in here!</Link>
        <Button variant="contained" color="default" onClick={this.handleSubmit}>Sign Up</Button>
      </div> */
