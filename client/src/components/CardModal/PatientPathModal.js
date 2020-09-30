import React, { Component } from 'react';
import { connect } from 'react-redux';
import { patientPath } from '../../actions/trail';
import { timeFormat } from 'd3';

class PatientPathModal extends Component {
  componentDidMount () {
    const { dispatch, assetId } = this.props;
    dispatch(patientPath(assetId));
  }
  ;
  render () {
    const { trail } = this.props;
    const t = timeFormat('%I:%M %p');
    return (
      <div className='container-tile'>
        <div className='accordion-info'>
          <div className='accordion-head'>
            <h5 className='module-header narrow'>
              PATIENT TRAIL
            </h5>
          </div>
        </div>
        <div className='containment-panel'>
          <svg height={ trail.length * 24 } >
            <g transform={ `translate(0,10)`}>

            { trail.map( (o,i) => {
              return <>
              <path
                stroke='#72777a'
                strokeWidth='2'
                d='M0,16.1666666666666H0V0H0'
                transform={ `translate(75,${ (24 * i) + 4 })` }
              >
              </path>
              <text
                x='10'
                y={ 24 * i }
                stroke='white'
                transform='translate(0,4)'
              >
                { t(o.capturedatts * 1000 ) }
              </text>
              <circle
                cx='45'
                cy={ 24 * i }
                r='3'
                stroke='#72777a'
                strokeWidth='2'
                fill='rgb(31, 40, 44)'
                transform={ `translate(30,0)`}
              ></circle>
              <text
                x='90'
                y={ 24 * i }
                stroke='white'
                transform='translate(0,4)'
              >
                { o.displayname }
              </text>
              </>
            }) }
            </g>
          </svg>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ trail: state.trail.data });

export default connect(mapStateToProps)(PatientPathModal);
