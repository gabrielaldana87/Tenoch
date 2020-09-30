import React, { Component } from 'react';
import SideBar from '../SideBar/SideBar';
import PageContainer from '../PageContainer/PageContainer';
import './Home.scss';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render () {
    const { children } = this.props;
    return (
      <>
      <SideBar/>
      <PageContainer children={ children }/>
      </>
    )
  }
}

export default Home;