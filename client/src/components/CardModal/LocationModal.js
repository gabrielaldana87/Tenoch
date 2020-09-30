import React, { Component } from 'react';
import Modal from 'react-modal';
import { timeFormat } from 'd3';
import './LocationModal.scss';

class LocationModal extends Component {
  constructor (props) {
    super(props);
    if (typeof document !== 'undefined') {
      Modal.setAppElement('#root');
    }

  }
  ;
  handleRequestClose = () => {
   const { toggleCardEditor } = this.props;
    toggleCardEditor();
  }
  ;
  render() {
    const
      { cardElement, isOpen, box } = this.props,
      t = timeFormat('%a %b %e , %I:%M %p')
    ;
    if (!cardElement){
      return null;
    }
    const boundingRect = cardElement.getBoundingClientRect();
    const isCardNearRightBorder = window.innerWidth - boundingRect.right < boundingRect.left;
    const style = {
      content: {
        top: Math.min(
          boundingRect.top,
          window.innerHeight - boundingRect.height - 18
        ),
        left: isCardNearRightBorder ? null : boundingRect.left + boundingRect.width,
        right: isCardNearRightBorder
          ? window.innerWidth - boundingRect.right
          : null,
        flexDirection: isCardNearRightBorder ? 'row-reverse' : 'row'
      }
    }
    ;
    return (
     <Modal
       closeTimeoutMS={150}
       isOpen={ isOpen }
       onRequestClose={ this.handleRequestClose }
       overlayClassName='modal-underlay'
       style={ style }
       className='modal'
       includeDefaultStyles={ false }
     >
       <div className='container-tile'>
         <div className='accordion-info'>
           <div className='accordion-head'>
             <h5 className='module-header narrow'>
               PATIENTS
             </h5>
           </div>
         </div>
         <div className='containment-panel'>
           <div className='accordion-body'>
             { box.patients ? box.patients.map(o => (
               <div className='patient-box'>
                 <p className='text-identifier schedule'>
                   <span className='inner-encounter'>
                     <strong className='recorded-timestamp'>Patient Name:</strong>
                     <strong>{o.firstname} {o.lastname}</strong>
                     <strong className='recorded-timestamp'>MRN:</strong>
                     <strong>{ o.mrn }</strong>
                     <strong className='recorded-timestamp'>Last Recorded Timestamp:</strong>
                     <strong>{ t(o.lastmovementts * 1000 )}</strong>
                   </span>
                 </p>
               </div>
             )) : null}
           </div>
         </div>
       </div>
     </Modal>
    )
  }
}

export default LocationModal