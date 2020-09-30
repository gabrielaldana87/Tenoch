import React, { Component } from 'react';
import './Row.scss';
import CardModal from '../CardModal/CardModal';
import PatientAddModal from '../CardModal/PatientAddModal';
import ResourceRow from './ResourceRow';
import ScheduleRow from './ScheduleRow';
import TreatmentEncounter from '../Encounters/TreatmentEncounter';
import ProviderEncounter from '../Encounters/ProviderEncounter';
import RFIDRecord from '../Record/RFIDRecord';
import { utcFormat, timeMinute, utcParse, timeHour, timeFormat } from 'd3';

class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutesElapsed: 0,
      isModalOpen: false,
    }
    ;
    this.rowContainerRef = React.createRef()
    ;
  }
  ;
  colorLogic (  mins, minBound, maxBound ) {
    if (mins > maxBound ) {
      return '#F4847D'
    } else if ( minBound <= mins && mins <= maxBound ) {
      return '#fecea8';
    } else return '#99b898';
  }
  ;
  deriveColor () {
    const
      { listId , rowId } = this.props,
      calcMinutes = timeMinute.count(new Date(rowId.lastmovementts * 1000), new Date()),
      minState = this.state.minutesElapsed ? this.state.minutesElapsed : calcMinutes,
      overtime = rowId.encounters ? rowId.encounters.map(o => o.appt_status ).filter(o => o.text == 'Encounter' +
    ' Overtime').length : 0,
      colorCard = this.colorLogic
    ;
    switch (listId) {
    case 'Lab_Location' :
      return colorCard(minState, 10, 15);
    break;
    case 'Waiting_Location' :
      return colorCard(minState, 30, 60);
    break;
    case 'Provider_Location' :
      return colorCard(minState, 45, 60);
    break;
    case 'Other_Location' :
      return colorCard(minState, 10, 40);
    break;
    case 'Treatment_Location' :
      return overtime >=1 ? '#F4847D' : '#99b898';
    break;
    default:
      return 'rgb(153, 184, 152)';
    }
  }
  ;
  toggleCardEditor = () => {
    this.setState({isModalOpen: !this.state.isModalOpen });
  }
  ;
  handleClick (evt) {
    const { current } = this.rowContainerRef ;
    if (current) {
      this.paragraph = current;
      this.toggleCardEditor(evt);
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
  render () {
    const
      { rowId, index, listId, facility } = this.props,
      { isModalOpen } = this.state,
      t = timeFormat('%a %b %e , %I:%M %p'),
      minuteCount = this.state.minutesElapsed,
      calcMinutes = timeMinute.count(new Date(rowId.lastmovementts * 1000), new Date()),
      minutesElapsed = minuteCount ? minuteCount : calcMinutes,
      style = { background: this.deriveColor() },
      svgLength = rowId.encounters ? rowId.encounters.length : 0,
      svgHeight = svgLength < 2 ? 20 : 20
    ;
    return (
      <>
        <div
          className='row-container'
          id={ `C${ rowId.mrn }`}
          ref={ this.rowContainerRef }
          style={ style }
          onClick={ evt => this.handleClick(evt) }
        >
          <div className='inner-image rfid'>
            <div className='identifying-container'>
              <span className='fullname'><strong>{rowId.firstname} {rowId.lastname}</strong></span>
              <span className='record-number'><strong>{ rowId.mrn }</strong></span>
            </div>
            {(function () {
              switch (listId) {
              case 'Treatment_Location' :
                return !rowId.encounters.some(o => o.prov_type === 'Resource') ?
                  <RFIDRecord
                    className='inner-encounter singular'
                    rowId={ rowId }
                    minutesElapsed={ minutesElapsed }
                    time={ t(rowId.lastmovementts * 1000) }
                  /> : null;
              case 'Provider_Location' :
                return !rowId.encounters.some(o => o.prov_type === 'Attending') ?
                  <RFIDRecord
                    className='inner-encounter singular'
                    rowId={ rowId }
                    minutesElapsed={ minutesElapsed }
                    time={ t(rowId.lastmovementts * 1000) }
                  />  : null;
              default :
                return <RFIDRecord
                  className='inner-encounter singular'
                  rowId={ rowId }
                  minutesElapsed={ minutesElapsed }
                  time={ t(rowId.lastmovementts * 1000) }
                />
              }
            })()}
            <div>
              <svg className='timeline' width='10' height={ svgLength * 33.75 } transform={`translate(7,${ svgHeight })`}>
                <g transform='translate(0,0)'>
                  <path
                    className="domain"
                    stroke={ this.deriveColor() }
                    strokeWidth='3'
                    fill='none'
                    d="M0,667.1666666666666H0V0H0"
                    transform='translate(4,6)'
                  >
                  </path>
                  <circle cx='4' cy='6' r='3' stroke={ this.deriveColor() } fill='green' strokeWidth='2'></circle>
                  { svgLength > 1 ? <circle cx='4'
                                            cy={ svgLength * 31.75 }
                                            r='3'
                                            stroke={ this.deriveColor() }
                                            strokeWidth='2'
                                            fill='green'></circle> : null }
                </g>
              </svg>
            </div>{
              rowId.encounters ? rowId.encounters.map(o => {
                switch (listId) {
                  case 'Treatment_Location':
                    return <TreatmentEncounter key={`${o.prc_abbr}-${o.mrn}`} o={o} listId={listId} rowId={rowId} />;
                  case 'Provider_Location' :
                    return <ProviderEncounter key={`${o.prc_abbr}-${o.mrn}`} o={o} listId={listId} rowId={rowId} />;
                  default:
                    return <ResourceRow key={`${o.prc_abbr}-${o.mrn}`} o={o} listId={listId} />
                }
              }) : null
            }
          </div>
        </div>
      { facility === 'dhk4' ?
        <CardModal
          isOpen={ isModalOpen }
          cardElement={ this.paragraph }
          color={ 'black' }
          background={ this.deriveColor() }
          card={ rowId }
          listId={ listId }
          toggleCardEditor={ this.toggleCardEditor }
        />
      : <PatientAddModal
        isOpen={ isModalOpen }
        cardElement={ this.paragraph }
        color={ 'black' }
        card={ rowId }
        listId={ listId }
        toggleCardEditor={ this.toggleCardEditor }
      /> }
      </>
    )
  }
}

export default Row;