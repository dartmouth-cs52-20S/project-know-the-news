import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import {
  AppBar, IconButton, Typography, Toolbar,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Posts from './posts';
import Post from './post';
import NewPost from './newpost';
import Signin from './signin';
import Signup from './signup';
import { signoutUser } from '../actions/index';
import PrivateRoute from './privateRoute';

const renderAuth = (auth, signout, history) => {
  if (auth) {
    return <Button color="inherit" onClick={() => signout(history)}>Sign Out</Button>;
  } else {
    return <NavLink className="nav" to="/signin"><Button color="inherit">Login</Button></NavLink>;
  }
};

const Nav = (props) => {
  return (
    <AppBar id="topNavBar">
      <Toolbar id="topBar">
        <div id="navLeft">
          <IconButton color="inherit" aria-label="menu">
            <NavLink className="nav" exact to="/"><HomeIcon /></NavLink>
          </IconButton>
          <Typography variant="h6">
            Know the News
          </Typography>
        </div>
        <div id="navRight">
          {renderAuth(props.auth, props.signoutUser, props.history)}
          <IconButton color="inherit" aria-label="menu">
            <NavLink className="nav" to="/posts/new"><AddIcon /></NavLink>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps(reduxState) {
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
          <Route exact path="/" component={Posts} />
          <PrivateRoute path="/posts/new" component={NewPost} />
          <Route path="/posts/:postID" component={Post} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route render={() => (<div> News not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
