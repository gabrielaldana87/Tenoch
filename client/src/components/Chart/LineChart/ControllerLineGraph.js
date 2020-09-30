import React , { Component } from 'react';
import { csv } from 'd3';
import LineGraphContainer from './LineGraphContainer';

class ControllerLineGraph extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [{
        Covid_weighted_loo: "0",
        Covid_weighted_los: "0",
        avg_loo: "0",
        avg_los: "0",
        elapsed_date: "3/1/2020",
        weighted_discharged_corrected_loo: "0",
        weighted_discharged_corrected_los: "0",
        columns:['elapsed_date']
      }],
      columns: ['hello']

    }
  }
  ;
  componentDidMount () {
    csv('./data/covid_sepsis.csv')
      .then(rows => {
        this.setState({ data: rows });
      })
  }
  ;
  onChange  = evt => {
    csv(`./data/${ evt.target.name }.csv`)
      .then(rows => {
        this.setState({ data: rows });
      })
  }
  ;
  render () {
    const { data } = this.state;
    return (
      <div className='controller'>
        <form onSubmit={ this.onSubmit }>
          <label
            htmlFor='fileSelect'
          >
            Pick a Measure:
            <select
              id='fileSelect'
              name='csv'
              onChange={ this.onChange }
            >
              <option value='covid_sepsis'>covid_sepsis</option>
            </select>
          </label>
        </form>
        <LineGraphContainer
          data={ data }
        />
      </div>
    )
  }
}

export default ControllerLineGraph;