import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import {
  AppBar, IconButton, Toolbar,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Topics from './topics';
import Post from './post';
import NewTopic from './newtopic';
import Signin from './signin';
import Signup from './signup';
import { signoutUser } from '../actions/index';
// import PrivateRoute from './privateRoute';

const renderAuth = (auth, signout, history) => {
  if (auth) {
    return (
      <Button color="inherit" onClick={() => signout(history)}>
        <div className="nav">
          Sign Out
        </div>
      </Button>
    );
  } else {
    return (
      <NavLink className="nav" to="/signin">
        Sign in
      </NavLink>
    );
  }
};

const Nav = (props) => {
  return (
    <AppBar id="topNavBar">
      <Toolbar id="topBar">
        <div id="navLeft">
          <IconButton color="inherit" aria-label="menu">
            <NavLink className="logo" exact to="/" />
          </IconButton>
          <NavLink id="navLeftItem" exact to="#">About</NavLink>
          <NavLink id="navLeftItem" exact to="#">Discussions</NavLink>
        </div>
        <div id="navRight">
          {renderAuth(props.auth, props.signoutUser, props.history)}
          <IconButton color="inherit" aria-label="menu">
            <NavLink className="nav" to="/topics/new"><AddIcon /></NavLink>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps(reduxState) {
  console.log(reduxState);
  return {
    auth: reduxState.auth.authenticated,
  };
}

const ConnectedNav = connect(mapStateToProps, { signoutUser })(withRouter(Nav));

const App = (props) => {
  return (
    <Router>
      <div>
        <ConnectedNav />
        <Switch>
          <Route exact path="/" component={Topics} />
          <Route path="/topics/new" component={NewTopic} />
          <Route path="/posts/:postID" component={Post} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route render={() => (<div> News not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

// <PrivateRoute path="/topics/new" component={NewTopic} />

export default App;
