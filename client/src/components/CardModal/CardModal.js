import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import CardOptions from './CardOptions';
import './CardModal.scss';

class CardModal extends Component {
  static propTypes = {
    card: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
    cardElement: PropTypes.shape({
      getBoundingClientRect: PropTypes.func.isRequired
    }),
    isOpen: PropTypes.bool.isRequired,
    toggleCardEditor: PropTypes.func.isRequired
  }
    ;
  constructor(props) {
    super(props);
    this.state = {
      isViewMapOpen: false,
      isTextAreaFocused: true
    };
    if (typeof document !== "undefined") {
      Modal.setAppElement("#root");
    }
  }
  toggleViewMap = () => {
    this.setState({ isViewMapOpen: !this.state.isViewMapOpen });
  }
    ;
  handleRequestClose = () => {
    const { isViewMapOpen } = this.state;
    const { toggleCardEditor } = this.props;
    if (!isViewMapOpen) {
      toggleCardEditor();
    }
  }
  ;
  componentDidMount () {
    // this.timerID = setInterval(() => {
    //   this.setState({timer: 1 });
    // }, 500);
  }
  ;
  componentWillUnmount () {
    // clearInterval(this.timerID);
  }
  ;
  render () {
    const { isViewMapOpen , isTextAreaFocused } =  this.state;
    const { cardElement, card, background, color, listId, isOpen } = this.props;
    if (!cardElement) {
      return null;
    }
    /*
     Create style of modal in order to not clip outside the edges no matter what device.
     */
    // Get dimensions of the card to calculate dimensions of cardModal.
    const boundingRect = cardElement.getBoundingClientRect();

    // Returns true if card is closer to right border than to the left
    const isCardNearRightBorder = window.innerWidth - boundingRect.right < boundingRect.left;

    // Check if the display is so thin that we need to trigger a centered, vertical layout
    const isThinDisplay = window.innerWidth < 550;

    // Position textarea at the same place as the card and position everything else away from closest edge
    const style = {
      content: {
        top: Math.min(
          boundingRect.top,
          window.innerHeight - boundingRect.height - 18
        ),
        left: isCardNearRightBorder ? null : boundingRect.left ,
        right: isCardNearRightBorder
          ? window.innerWidth - boundingRect.right
          : null,
        flexDirection: isCardNearRightBorder ? "row-reverse" : "row"
      }
    };

    // For layouts that are less wide than 550px, let the modal take up the entire width at the top of the screen
    const mobileStyle = {
      content: {
        flexDirection: "column",
        top: 3,
        left: 3,
        right: 3
      }
    };
    return (
      <Modal
        closeTimeoutMS={150}
        isOpen={isOpen}
        onRequestClose={ this.handleRequestClose }
        overlayClassName='modal-underlay'
        style={isThinDisplay ? mobileStyle : style }
        className='modal'
        includeDefaultStyles={ false }
        onClick={ this.handleRequestClose }
      >
        <div
          className='modal-textarea-wrapper'
          style={{
            minHeight: isThinDisplay ? 'none' : boundingRect.height,
            width: isThinDisplay ? '100%' : boundingRect.width,
            boxShadow: isTextAreaFocused ? '0px 1px 10px 5px rgb(255, 255, 255)' : null,
            background: 'transparent'
          }}
        >
        </div>
        <CardOptions
          isViewMapOpen={ isViewMapOpen }
          card={ card }
          color={ color }
          background={ background }
          boundingRect={ boundingRect }
          isCardNearRightBorder={ isCardNearRightBorder }
          isThinDisplay={ isThinDisplay }
          toggleViewMap={ this.toggleViewMap }
        />
      </Modal>
    )
  }

}

export default CardModal;