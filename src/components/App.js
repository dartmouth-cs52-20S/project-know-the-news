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
import Topics from './topics';
import Topic from './topic';
import AllTopics from './alltopics';
import AboutPage from './about';
// import NewTopic from './newtopic';
import Signin from './signin';
import Signup from './signup';
import Bills from './bills';
import { signoutUser } from '../actions/index';
// import PrivateRoute from './privateRoute';

const renderAuth = (auth, signout, history) => {
  if (auth) {
    return (
      <Button color="inherit" onClick={() => signout(history)}>
        <div className="nav">
          Sign Out - {localStorage.getItem('currentUser')}
        </div>
      </Button>
    );
  } else {
    return (
      <NavLink className="nav" to="/signin">
        <div className="nav">
          Sign In
        </div>
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
          <NavLink id="navLeftItem" exact to="/about">About</NavLink>
          <NavLink id="navLeftItem" exact to="/topics">Topics</NavLink>
          <NavLink id="navLeftItem" exact to="/bills">Congress</NavLink>
        </div>
        <div id="navRight">
          {renderAuth(props.auth, props.signoutUser, props.history)}
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
          <Route exact path="/" component={Topics} />
          <Route path="/topics/:topicID" component={Topic} />
          <Route path="/topics" component={AllTopics} />
          <Route path="/about" component={AboutPage} />
          <Route path="/bills" component={Bills} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route render={() => (<div> News not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

// <Route path="/topics/new" component={NewTopic} />
// <Route path="/topics" component={AllTopics} />
// <PrivateRoute path="/topics/new" component={NewTopic} />

export default App;
