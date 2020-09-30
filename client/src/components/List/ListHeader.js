import React, { Component } from 'react';
import './ListHeader.scss';

class ListTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newTitle: props.listTitle
    }
  }
  ;
  render () {
    const { listTitle, color } = this.props;
    const style = { background: '#2a363b' };
    return (
      <div className='list-header'>
        <div className='list-title-button' style={ style }>
          {listTitle}
        </div>
      </div>
    )
  }
}

export default ListTitle;