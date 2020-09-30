import React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Site from '../Site/Site';
import SignIn from '../Site/SignIn';
import './App.css';

const App = ({ user, loggedIn }) => {

  if (loggedIn) {
    const { adGroup } = user;
    return <Site path={ adGroup.path }/>
  }
  // If not logged in, always redirect to signin page
  return (
    <Switch>
      <Route exact path='/' component={ SignIn }/>
      <Redirect to='/'/>
    </Switch>
  )
};

const mapStateToProps = state => {
  const { user, loggedIn } = state.authentication;
  return {
    user: user,
    loggedIn: loggedIn
  }
};

export default withRouter(connect(mapStateToProps)(App));
