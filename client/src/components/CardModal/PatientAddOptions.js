import React,  { Component } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from '../ClickOutside/ClickOutside';
import PatientPathModal from './PatientPathModal';
import './CardOptions.scss';

class PatientAddOptions extends Component {
  static propTypes = {
    isViewMapOpen: PropTypes.bool.isRequired,
    card: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
    isCardNearRightBorder: PropTypes.bool.isRequired,
    isThinDisplay: PropTypes.bool.isRequired,
    boundingRect: PropTypes.object.isRequired,
    toggleViewMap: PropTypes.func.isRequired
  }
    ;
  constructor (props) {
    super(props);
    this.state = {
    }
  }
  ;
  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.toggleViewMap();
      this.mapPickerButton.focus();
    }
  }
    ;
  handleClickOutside = () => {
    const { toggleViewMap } = this.props;
    toggleViewMap();
    this.mapPickerButton.focus();
  }
  ;
  handleClickOutsidePath = () => {
    const { togglePatientPath } = this.props;
    togglePatientPath();
    this.patientPathPickerButton.focus();
  }
  ;
  render () {
    const {
        isCardNearRightBorder,
        isViewMapOpen,
        isPatientPathOpen,
        toggleViewMap,
        togglePatientPath,
        card,
        color,
        background,
        isThinDisplay,
        boundingRect
      } = this.props,
      path = './data/gabriel_location_rfid_032019.csv' //`nypnodedev.sis.nyp.org:3000/api/patientpath/${ card.assetid }`
      ;
    return(
      <div
        className='options-list'
        style={{
          alignItems: isCardNearRightBorder ? 'flex-end' : 'flex-start'
        }}
      >
        <div className='modal-notepad-picker-wrapper'>
          {/*<button*/}
            {/*className='options-list-button'*/}
            {/*onClick={ toggleViewMap }*/}
            {/*onKeyDown={ this.handleKeyDown }*/}
            {/*style={{color: color}}*/}
            {/*ref={ ref => {*/}
              {/*this.mapPickerButton = ref;*/}
            {/*}}*/}
            {/*aria-haspopup*/}
            {/*aria-expanded={ isViewMapOpen }*/}
          {/*>*/}
            {/*<i className='c-light-blue-500 ti-location-pin'></i>*/}
            {/*&nbsp; Add Patient to List*/}
          {/*</button>*/}
          {/*{isViewMapOpen && (*/}
            {/*<ClickOutside*/}
              {/*eventTypes='click'*/}
              {/*handleClickOutside={ this.handleClickOutside }*/}
            {/*>*/}
              {/*<div*/}
                {/*className='modal-map-view-picker'*/}
                {/*onKeyDown={ this.handleKeyDown }*/}
                {/*style={{*/}
                  {/*background: 'rgba(0,0,0,.75)'*/}
                {/*}}*/}
              {/*>*/}
                {/*<div className='modal-prompt'>*/}
                  {/*<strong className='recorded-timestamp'>Patient Added to List</strong>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</ClickOutside>*/}
          {/*)*/}
          {/*}*/}
          <button
            className='options-list-button'
            onClick={ togglePatientPath }
            onKeyDown={ this.handleKeyDown }
            style={{color: color}}
            ref={ ref => {
              this.patientPathPickerButton = ref;
            }}
            aria-haspopup
            aria-expanded={ isViewMapOpen }
          >
            <i className='c-light-blue-500 ti-location-pin'></i>
            &nbsp; Patient Trail
          </button>
          { isPatientPathOpen && (
            <ClickOutside
              eventTypes='click'
              handleClickOutside={ this.handleClickOutsidePath }
            >
              <PatientPathModal assetId={ card.assetid }/>
            </ClickOutside>
          )
          }
        </div>
      </div>
    )
  }
}

export default PatientAddOptions;