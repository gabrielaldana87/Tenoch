import React, { Component } from 'react';
import draw from './helpers';
import './Viz.scss'

class Viz extends Component {
  componentDidMount() {
    draw(this.props);
  }
  ;
  componentDidUpdate(prevProps) {
    draw(this.props);
  }
  ;
  render () {
    const { name } = this.props;
    return (
      <div className={ name }/>
    )
  }
}

export default Viz;