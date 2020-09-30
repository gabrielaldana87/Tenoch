import React, { Component } from 'react';
import { timeFormat , timeMinute } from 'd3';

class LabEncounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutesElapsed:0
    }
  }
  ;
  calculateMinsElapsed (lastTs) {
    let currentTs = new Date();
    this.setState({minutesElapsed: timeMinute.count(new Date(lastTs) * 1000, currentTs)});
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
  render() {
    const { o, rowId } = this.props,
      t = timeFormat('%I:%M %p'),
      minuteCount = this.state.minutesElapsed,
      calcMinutes = timeMinute.count(new Date(rowId.lastmovementts * 1000), new Date()),
      minutesElapsed = minuteCount ? minuteCount : calcMinutes,
      style = { textTransform: 'capitalize' }
      ;
    return (
      <>
      {/*<strong className='encounter-info'>{ o.appt_status }</strong>*/}
      <div className='resource-box'>
        <strong className='encounter-info'>{ o.appt_status.text }</strong>
        {/*<div className='resource-tag'>*/}
        {/*{ o.prov_type.substr(0,1) }*/}
        {/*</div>*/}
        <p className='text-identifier schedule'>
          { o.prov_type.substr(0,1) === 'R' ?
            <>
            <strong className='resource-strong' style={ style }>{ o.prov_name.toLowerCase() }</strong>
            <strong>{ o.appt_length } mins</strong><br></br>
            <span className='inner-span oversize'>APPT TIME</span><strong>{ t(o.scheduledts) }</strong><br></br>
            </>
            :
            <div>
              <strong className='resource-strong' style={ style }>{ o.prc_name.toLowerCase() }</strong>
              <strong>{ o.appt_length } mins</strong><br></br>
              <span className='inner-span oversize'>APPT TIME</span><strong>{ t(o.scheduledts) }</strong><br></br>
            </div>
          }
        </p>
      </div>
      </>
    )
  }
}

export default LabEncounter;