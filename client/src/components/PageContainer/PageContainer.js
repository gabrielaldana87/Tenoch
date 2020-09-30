import React , { Component } from 'react';
import Header from '../Header/Header';
import './PageContainer.scss';

class PageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  ;
  render () {
    const { children } = this.props;
    return (
      <div className='page-container'>
        <Header/>
        <main className='main-content bgc-grey-100'>
          <div id='mainContent'>
            { children }
          </div>
        </main>
      </div>
    )
  }
}

export default PageContainer;