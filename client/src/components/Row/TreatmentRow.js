import React, { Component } from 'react';
import { timeMinute } from 'd3';

class TreatmentRow extends Component {
  constructor (props) {
    super(props);
    this.state = {
      minutesElapsed: 0,
      isModalOpen: false
    }
  }
  ;
  toggleCardEditor = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  ;
  handleClick (evt) {
    const { current } = this.rowContainerRef;
    if (current) {
      this.paragraph = current;
      this.toggleCardEditor(evt);
    }
  }
  ;
  calculateMinsElapsed (lastTs) {
    let currentTs = new Date();
    this.setState({ minutesElapsed: timeMinute.count(new Date(lastTs) * 1000, currentTs)});
  }
  ;
  componentDidMount () {
    let lastTs = this.props.rowId.lastmovementts;
    this.timerID = setInterval( () => this.calculateMinsElapsed(lastTs), 1000 * 60);
  }
  ;
  componentWillUnmount () {
    clearInterval( this.timerID );
  }
  ;
  render() {
    return (<></>)
  }
}

export default TreatmentRow;