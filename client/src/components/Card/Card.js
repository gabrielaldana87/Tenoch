import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rows from './Rows';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Card.scss';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [],
      active: true,
      isModalOpen: false
    }
  }
  ;
  toggleCardEditor () {
    this.setState({isModalOpen: !this.state.isModalOpen });
  }
  ;
  handleClick (event) {

  }
  ;
  render () {
    const { cardId, index, listId, facility } = this.props;
    const { isModalOpen } = this.state;
    return(
      <>
        <div
          className={classnames('card-title', {
            'card-title--drag': false
          })}
          onClick={event => {
            this.handleClick(event);
          }}
        >
        </div>
        <div
          className='card-title-html'
          ref={ ref => {
            this.ref = ref;
          }}
          style={{
            background: 'rgb(31,40,44)',//card.background,
            color:  'white',//card.color,
            minHeight: '425px',
            marginBottom: '25px'
          }}
        >
          <h3>{cardId.label}</h3>
          <Rows listId={cardId._id} rows={cardId.rows} facility={facility}/>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state, props) => ({ ...props });

export default connect(mapStateToProps)(Card);
