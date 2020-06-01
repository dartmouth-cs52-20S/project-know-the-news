/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Helmet } from 'react-helmet';
import { signupUser } from '../actions/index';
import {
  PrettoSlider, VoterMarks, MediaMarks, DividedMarks,
} from '../helpers/sliders';

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
      mediaValue: '',
      divideValue: '',
    };
  }

  componentDidMount() {
    this.props.auth.error = '';
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

  // function called on continue button press
  handleContinue = (event) => {
    // make sure that passwords matched up, then change the continue bool to true
    if (this.state.password === this.state.npassword) {
      console.log('nice');
      this.setState({ continue: true });
      // call the render function again with continue == true
      this.forceUpdate();
    // else if the passwords didnt match up, set correct states (clear password states)
    } else {
      this.setState({
        password: '',
        npassword: '',
        samePword: false,
      });
      // and call the render function again with samePword == False
      this.forceUpdate();
    }
  }

  // function called on continue button press
  handleSubmit = (event) => {
    this.props.signupUser(this.state.email, this.state.username, this.state.password, this.props.history);
  }

  // function that is called on slider change
  handleVoterSliderDrag = (event, val) => {
    this.setState({ voterValue: val });
    console.log(this.state.voterValue);
  }

  handleMediaSliderDrag = (event, val) => {
    this.setState({ mediaValue: val });
    console.log(this.state.mediaValue);
  }

  handleDivideSliderDrag = (event, val) => {
    this.setState({ divideValue: val });
    console.log(this.state.divideValue);
  }

  renderFirstForm() {
    return (
      <div id="parent-signUpPage">
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
      </div>
    );
  }

  renderFirstFormWithSecondFormBelow() {
    return (
      <div id="parent-signUpPage">
        <div id="signUpPage">
          <Helmet>
            <style>{'body { background-color: #C2DDE6; }'}</style>
          </Helmet>
          <h3 id="header">Varify</h3>
          <TextField className="fields" id="outlined-basic" label="Email" value={this.state.email} onChange={this.handleChangeEmail} variant="outlined" />
          <TextField className="fields" id="outlined-basic" label="Username" value={this.state.username} onChange={this.handleChangeUsername} variant="outlined" />
          <TextField className="fields" id="outlined-basic" type="password" label="Password" value={this.state.password} onChange={this.handleChangePassword} variant="outlined" />
          <TextField className="fields" id="outlined-basic" type="password" label="Re-Type Password" value={this.state.npassword} onChange={this.handleChangeCheckPassword} variant="outlined" />
        </div>
      </div>
    );
  }

  renderSecondForm() {
    return (
      <div id="parent-signUpPage-cont">
        <div id="signUpPage-cont">
          <Helmet>
            <style>{'body { background-color: #C2DDE6; }'}</style>
          </Helmet>
          <div className="head-text">
            <h4>Tell us a few more things about yourself for a better user experience.</h4>
            <h6>(Not comfortable answering? Just press Sign Up!)</h6>
          </div>
          <div className="sliders">
            <a id="voter-patterns" href="https://www.politicalcompass.org/test" target="_blank">Your Usual Voting Patterns</a>
            <PrettoSlider
              valueLabelDisplay="off"
              defaultValue={50}
              onChangeCommitted={this.handleVoterSliderDrag}
              track={false}
              step={25}
              marks={VoterMarks}
              aria-labelledby="voter-patterns"
            />
            <Typography id="media-trust" gutterBottom>
              Describe honesty of the media
            </Typography>
            <PrettoSlider
              valueLabelDisplay="off"
              defaultValue={50}
              onChangeCommitted={this.handleMediaSliderDrag}
              track={false}
              step={25}
              marks={MediaMarks}
              aria-labelledby="media-trust"
            />
            <Typography id="divide-label">
              Division of among Americans
            </Typography>
            <PrettoSlider
              valueLabelDisplay="off"
              defaultValue={50}
              onChangeCommitted={this.handleDivideSliderDrag}
              track={false}
              step={25}
              marks={DividedMarks}
              aria-labelledby="divide-label"
            />
          </div>
          <div id="bottomSignUp">
            <Link className="link" component={NavLink} to="/signin">Already have an account?</Link>
            <Button className="button" variant="contained" size="large" onClick={this.handleSubmit}>Sign Up!</Button>
          </div>
        </div>
      </div>
    );
  }

  renderPasswordNotMatch() {
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

  renderFirstFormDBError() {
    // this.setState({ password: '', npassword: '' });
    return (
      <div id="parent-signUpPage">
        <div id="signUpPage">
          <Helmet>
            <style>{'body { background-color: #C2DDE6; }'}</style>
          </Helmet>
          <h3 id="header">Varify</h3>
          <TextField
            error
            className="fields"
            id="outlined-basic"
            label="Email"
            value={this.state.email}
            onChange={this.handleChangeEmail}
            variant="outlined"
            helperText={this.props.auth.error}
          />
          <TextField
            error
            className="fields"
            id="outlined-basic"
            label="Username"
            value={this.state.username}
            onChange={this.handleChangeUsername}
            variant="outlined"
            helperText={this.props.auth.error}
          />
          <TextField className="fields" id="outlined-basic" type="password" label="Password" value={this.state.password} onChange={this.handleChangePassword} variant="outlined" />
          <TextField className="fields" id="outlined-basic" type="password" label="Re-Type Password" value={this.state.npassword} onChange={this.handleChangeCheckPassword} variant="outlined" />
        </div>
      </div>
    );
  }

  renderSecondFormDBError() {
    return (
      <div id="parent-signUpPage-cont">
        <div id="signUpPage-cont">
          <Helmet>
            <style>{'body { background-color: #C2DDE6; }'}</style>
          </Helmet>
          <div className="head-text">
            <h4>Tell us a few more things about yourself for a better user experience.</h4>
            <h6>(Not comfortable answering? Just press Sign Up!)</h6>
          </div>
          <div className="sliders">
            <a id="voter-patterns" href="https://www.politicalcompass.org/test" target="_blank">Your Usual Voting Patterns</a>
            <PrettoSlider
              valueLabelDisplay="off"
              defaultValue={50}
              onChangeCommitted={this.handleVoterSliderDrag}
              track={false}
              step={25}
              marks={VoterMarks}
              aria-labelledby="voter-patterns"
            />
            <Typography id="media-trust" gutterBottom>
              Describe honesty of the media
            </Typography>
            <PrettoSlider
              valueLabelDisplay="off"
              defaultValue={50}
              onChangeCommitted={this.handleMediaSliderDrag}
              track={false}
              step={25}
              marks={MediaMarks}
              aria-labelledby="media-trust"
            />
            <Typography id="divide-label">
              Division of among Americans
            </Typography>
            <PrettoSlider
              valueLabelDisplay="off"
              defaultValue={50}
              onChangeCommitted={this.handleDivideSliderDrag}
              track={false}
              step={25}
              marks={DividedMarks}
              aria-labelledby="divide-label"
            />
          </div>
          <div id="bottomSignUp">
            <Link className="link" component={NavLink} to="/signin">Already have an account?</Link>
            <Button className="button" variant="contained" size="large" onClick={this.handleSubmit}>Sign Up!</Button>
          </div>
          <div className="error">
            {this.props.auth.error}
          </div>
        </div>
      </div>
    );
  }


  render() {
    // if we have not pressed the continue button yet
    // here we have a form for email, username, and password (with a retype password check)
    if (!this.state.continue) {
      if (this.state.samePword) {
        // originial form that renders
        return (
          <div>
            {this.renderFirstForm()}
          </div>
        );
      } else {
        // render if retyped password didn't match up the password box will render in red
        return (
          <div>
            {this.renderPasswordNotMatch()}
          </div>
        );
      }
    } else {
      // this is rendered after the user has hit continue (has all our slider bar stuff as in figma)
      // eslint-disable-next-line no-lonely-if
      if (this.props.auth.error === '' || !this.props.auth.error) {
        return (
          <div>
            {this.renderFirstFormWithSecondFormBelow()}
            {this.renderSecondForm()}
          </div>
        );
      } else {
        return (
          <div>
            {this.renderFirstFormDBError()}
            {this.renderSecondFormDBError()}
          </div>
        );
      }
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    auth: reduxState.auth,
  };
}

export default connect(mapStateToProps, { signupUser })(Signup);
