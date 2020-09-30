import React , { Component } from 'react';

class RFIDRecord extends Component {
  render() {
    const { className, rowId, minutesElapsed, time } = this.props;
    return (
      <div className='resource-box'>
        <p className='text-identifier schedule'>
          <span className={ className }>
            <strong className='recorded-timestamp'>last rfid record</strong>
            <strong>{ rowId.lastknownlocationname }</strong>
            <strong className='resource-strong'>{ time }</strong>
            <strong>{ minutesElapsed } mins ago</strong>
          </span>
        </p>
      </div>
    )
  }
}

export default RFIDRecord;