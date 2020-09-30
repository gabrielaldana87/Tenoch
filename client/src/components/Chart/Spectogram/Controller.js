import React, { Component } from 'react';
import Viz from './Viz';
import { csv } from 'd3';
import * as _ from 'underscore';

class Controller extends Component {
  constructor (props) {
    super(props);
    this.state = {
      color: '',
      width: '',
      toDraw: [],
      data:[[0]],
      dataset: [{avg_loo: "",
        avg_los: "",
        discharged_avg_age: "",
        discharged_patient_count: "0",
        dt: new Date(),
        elapsed_date: "3/1/2020",
        loo_avg_age: "",
        loo_patient_count: "0",
        stdev_loo: "",
        stdev_los: "",
        total_elapsed_time: "at least 01 days",
        weighted: "1"}],
      domain: [new Date(), new Date()]
    }
  }
  ;
  onSubmit = evt => {
    evt.preventDefault();
    const newShape = {
      color: this.state.color,
      width: this.state.width
    }
    ;
    this.setState({ toDraw: [...this.state.toDraw, newShape ]})
    ;
  }
  ;
  onChange = evt => {
    this.setState({ [evt.target.name ]: evt.target.value });
  }
  ;
  componentDidMount () {
   const { col } = this.props;
    csv('./data/weighted_los_loo.csv')
      .then(boards => {
        this.setState({ dataset: boards });
        const
          dates = _.uniq(boards, o => o.elapsed_date ),
          categories =_.unique(boards, o => o.total_elapsed_time),
          reparsed = categories.map( o => boards.filter(j =>j.total_elapsed_time === o.total_elapsed_time )
            .map(k => k[col]))
          ;
        this.setState({ data: reparsed });
        this.setState({ domain: [new Date(dates[0].elapsed_date), new Date(dates[dates.length - 1].elapsed_date)] })
      });
  }
  ;
  render () {
    const { col } = this.props;
    return (
      <div className='controller'>
        <form onSubmit={ this.onSubmit }>
          <label
            className={ `label_${col}` }
            htmlFor='colorSelect'>{ col.toUpperCase() }</label>
        </form>
        <Viz
          shapes={ this.state.toDraw }
          data={ this.state.data }
          dataset={ this.state.dataset }
          domain={ this.state.domain }
          name={ col }
        />
      </div>
    )
  }
}

export default Controller;