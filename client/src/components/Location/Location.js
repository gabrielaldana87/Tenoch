import React , { Component } from 'react';
import Tile from '../Tile/Tile';

class Location extends Component {
  constructor (props) {
    super (props);
    this.state = {
      locations:[]
    };
  }
  ;
  componentDidMount () {
    let path = this.props.path;
    fetch(`./data/${path}.json`)
      .then(res => res.json())
      .then(locations => this.setState({ locations: locations }));
  }
  ;
  componentDidUpdate (prevProps) {
    let path = this.props.path;
    if (path !== prevProps.path) {
      fetch(`./data/${path}.json`)
        .then(res => res.json() )
        .then(locations => this.setState({ locations: locations }));
    }
  }
  ;
  render () {
    const { locations } = this.state;
    return (
      <div>
        <title>{ null }</title>
        <div className='tiles-wrapper'>
          <div className='tiles'>
            {Object.keys(locations).map( location => (
              <Tile
                title={ location }
                boxes={ locations[location] }
              />
            ))
            }
          </div>
        </div>
      </div>
    )
  }

}

export default Location;