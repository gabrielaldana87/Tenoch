import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';

class Cards extends Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object).isRequired
  }
  ;
  render() {
    const { listId, cards, facility } = this.props;
    return (
      <>
      <div className='cards'>
        {cards.map((cardId, index) => (
          <Card
            key={cardId._id}
            cardId={cardId}
            index={index}
            listId={listId}
            facility={facility}
          />
        ))}
        <div
          style={{float: 'left', clear: 'both'}}
        ></div>
      </div>
      </>
    )
  }
}

export default Cards;