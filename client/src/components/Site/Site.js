import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import SignIn from './SignIn';
import Board from '../Board/Board';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Welcome from './Welcome';
import Controller from '../Chart/Spectogram/Controller';
import ControllerLineGraph from '../Chart/LineChart/ControllerLineGraph';
import Location from '../Location/Location';
import { history } from '../../helpers/history';

class Site extends Component {
  constructor (props) {
    super(props);
    history.listen((location, action) => {
      //clear alert on location change
    });
  }
  ;
  render () {
    const
      { path } = this.props,
      dhk = '/dhk4',
      st3 = '/starr3',
      dhk_loc = '/dhk4_location_lookup',
      st3_loc = '/starr3_location_lookup',
      cohen = '/cohen'
    ;
    return (
      <Switch>
        <Router history={ history }>
          <PrivateRoute exact path='/' children={
            path === '/' ? <Home><Welcome/></Home> :
              <Home><Board path={ path } /></Home>
          } />
          <Route path={ dhk } children={ <Home><Board path={ dhk } /></Home>  } />
          <Route path={ st3 } children={ <Home><Board path={ st3 } /></Home>  } />
          <Route path={ dhk_loc } children={ <Home><Location path={ dhk_loc } /></Home> } />
          <Route path={ st3_loc } children={ <Home><Location path={ st3_loc } /></Home> } />
          <Route path={ cohen } children={ <Home><Board path={ cohen } /></Home> } />
          <Route path='/covid' children={ <>
            {/*<Controller col='avg_loo'/>*/}
            {/*<Controller col='avg_los'/>*/}
            <ControllerLineGraph/>
          </>} />
          <Route path='/signin' component={ SignIn }/>
          </Router>
      </Switch>
    );
  }
  ;
}

export default connect()(Site);