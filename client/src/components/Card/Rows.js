import React, { Component } from 'react';
import Row from '../Row/Row';

class Rows extends Component {
  constructor(props) {
    super(props);
      this.state = {
        rows: []
      }
  }
  render () {
    const { listId, rows, facility } = this.props;
    return (
      <div className='rows'>
        { rows.map((rowId, index) => (
          <Row
            key={rowId.assetid}
            rowId={rowId}
            index={index}
            listId={listId}
            facility={facility}
          />
        ))}
      </div>
    )
  }
}

export default Rows;