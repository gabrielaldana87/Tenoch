import React , { Component } from 'react';

class BoardNew extends Component {
  componentDidMount () {
    fetch('./data/mergedDataset.json')
      .then(res => res.json())
      .then( board => console.log(board))
  }
  ;
  render() {
    return (<div></div>)
  }
}

export default BoardNew;