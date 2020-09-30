import React, { Component } from 'react';
import draw from './multiLineDraw';
import './LineGraphContainer.scss'

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
      <div className={ name }>
        <svg id="chart" width="850" height="410"></svg>
      </div>
    )
  }
}

export default Viz;