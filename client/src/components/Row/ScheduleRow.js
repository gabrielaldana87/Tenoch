import React , { Component } from 'react';
import './ScheduleRow.scss';
import { utcFormat } from 'd3';

class ScheduleRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerHeight: null,
    }
    ;
    this.myRef = React.createRef();
  }
  ;
  componentDidMount () {
    const
      { current } = this.myRef,
      { rowId } = this.props,
      length = rowId.encounters.length,
      height = current.getBoundingClientRect().height,
      card_dimension =  length * height + (31 + length * 3)
      ;
    console.log(rowId)

    this.setState({ containerHeight: card_dimension });
  }
  ;
  render () {
    const
      { rowId } = this.props,
      contHt = this.state.containerHeight,
      { firstName,
      lastName,
      // prcName,
      // apptTime,
      // apptLenght,
      // provName,
      // provType,
      mrn
      } = rowId,
      encounters = rowId.encounters,
      t = utcFormat('%I:%M %p')
    ;
    return (
      <div
        className='row-container'
        style={{ background : 'steelblue' , height: `${ contHt }px`}}
      >
        <div className='inner-image schedule'>
          <div className='identifying-container'>
            <span className='fullname'><strong>{ firstName.toUpperCase() } { lastName.toUpperCase() }</strong></span>
            <span className='record-number'><strong>{ mrn }</strong></span>
          </div>
          { encounters.map( o => (
              <div className='resource-box' ref= { this.myRef }>
                <div className='resource-tag'>
                  { o.provType.substr(0,1) }
                </div>
                  <p className='text-identifier schedule'>
                    { o.provType.substr(0,1) === 'A' ?
                      <><span className='inner-span'>Attending:</span><strong>{ o.provName }</strong></> :
                      <><span className='inner-span'>Resource:</span><strong>{ o.prcName }</strong></>
                    }
                    <span className='inner-span'>Appt. Time:</span><strong>{ t(new Date(o.apptTime)) }</strong><br></br>
                    <span className='inner-span'>Appt. Duration:</span><strong>{ o.appLength } mins</strong>
                  </p>
              </div>
          )) }
        </div>
      </div>
    )
  }
}

export default ScheduleRow;