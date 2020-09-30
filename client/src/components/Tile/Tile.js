import React , { Component } from 'react';
import Box from './Box';
import _ from 'underscore';
import './Tile.scss';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
    ;
  }
  ;
  render () {
    const { title , boxes } = this.props;
    const grouped = _.groupBy(boxes, o => o.FriendlyGrouping);
    return (
      <div className='container-tile col col-md-9' style={{ width: '75%'}}>
        <div className='accordion-info'>
          <div className='accordion-head'>
            <h5 className='module-header narrow'>{ title }</h5>
          </div>
        </div>
        <div className='containment-panel'>
          <div className='accordion-body'>
            <div className='locations-box'>
              { Object.keys(grouped).map(group => (
                <div className='background-group'>
                  <div className='grouping-title'>{ group }</div>
                  { grouped[group].map(box => <Box box={ box }/>)}
                </div>
                )) }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Tile;