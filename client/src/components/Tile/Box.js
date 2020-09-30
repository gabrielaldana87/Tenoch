import React, { Component } from 'react';
import LocationModal from '../CardModal/LocationModal';

class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
    ;
    this.boxContainerRef = React.createRef()
    ;
  }
  ;
  toggleCardEditor = () => {
    this.setState({isModalOpen: !this.state.isModalOpen });
  }
  ;
  handleClick (evt)  {
    const { current } = this.boxContainerRef;
    if (current) {
      this.paragraph = current;
      this.toggleCardEditor(evt);
    }
  }
  ;
  render() {
    const { box } = this.props;
    const { isModalOpen } = this.state;
    return (
      <>
        <div
          className='row-container floating-layout'
          style={{ backgroundColor: box.Color  }}
          onClick={ (evt) => this.handleClick(evt) }
          ref={ this.boxContainerRef }
          id={box.LocationId}
          key={box.LocationId}
        >
          <span className='light-label'>
            <span className='light-label'>Location ID:</span><strong> { box.LocationId }</strong>
          </span>
          <div className='break-line'></div>
          <span className='light-label'>
            <span className='light-label'>Location Name:</span>
          </span>
          <strong className='light-label'>{ box.DisplayName }</strong>
          { box.patients.length ?
            <>
              <span className='badge' style={{ cursor: 'pointer'}}>
                { box.patients.length }
              </span>
              <LocationModal
                isOpen={ isModalOpen }
                cardElement={ this.paragraph }
                toggleCardEditor={ this.toggleCardEditor }
                color='black'
                background='white'
                box={ box }
              />
            </>: null }
        </div>

      </>
    )
  }
}

export default Box;