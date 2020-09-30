import React , { Component } from 'react';
import AsyncSelect from 'react-select/async';
import { connect } from 'react-redux';
import { select, selectAll } from 'd3';
import './Search.scss';
import { colourStyles, groupStyles, groupBadgeStyles } from './searchStyles';
import { fetchBoard } from '../../actions/board';
import * as _ from 'underscore';

const formatGroupLabel = data => {
  return (
  <div style={ groupStyles }>
    <span>{ data.label }</span>
    <span style={ groupBadgeStyles }>{ data.options.length }</span>
  </div>
) };

class Search extends Component {
  constructor (props) {
    super(props);
    this.state = {
      inputValue: '',
      searchApiUrl: props.searchApiUrl,
      limit: props.limit,
      selectedOption: this.props.defaultValue,
      fetchPatients : _.debounce(this.fetchPatients.bind(this), 500)
    }
  }
  onChange = vals => {
    if ( !vals || vals.length < 1) {

      selectAll('.row-container')
        .classed('selected', false)
        .style('display', null)
      ;
    } if (vals) {
      selectAll('.row-container')
        .classed('selected', false)
      ;
      vals.map(v => {
        select(`#C${ v.value }`)
          .style('display', null)
          .classed('selected', true)
        ;
        selectAll(`.row-container:not(.selected)`)
          .style('display', 'none')
        ;
      })
    }
  }
  ;
  mapOptionsToValues = options => {
    const
      mrnOptions = []
    ;
     options.lists.map(option => {
      option.cards.map(card => {
        card.rows.map( row => {
          mrnOptions.push({
            value: row.mrn,
            lastKnownLocation: row.lastknownlocationname,
            label: `${ row.firstname } ${ row.lastname }` }
          )
        })
      })
    });
    this.onChange(mrnOptions);
    return mrnOptions;
  }
  ;
  fetchPatients = (inputValue, callback) => {
    const { dispatch, path } = this.props;

    dispatch(fetchBoard(path))
      .then( res => {
        reformat(res)
        if (this.props.mapOptionsToValues) callback(this.props.mapOptionsToValues(res));
        else {
          callback(this.mapOptionsToValues(res)
            .filter(o =>  o.value.toLowerCase().includes(inputValue.toLowerCase()))
          );
        }
      })
    ;
  }
  ;
  render () {
    const { groupedOptions } = this.props;
    return (
      <div className='search-query'>
        <AsyncSelect
          cacheOptions
          defaultOptions
          isMulti
          loadOptions={ this.fetchPatients }
          formatGroupLabel = { formatGroupLabel }
          styles={ colourStyles }
          onChange={ this.onChange }
          placeholder='Search Patients...'
        />
      </div>
    )
  }
}

const reformat = res => {
  const
    mrnOptions = [],
    assetOptions = [],
    lastNameOptions = [],
    fullNameOptions = []
  ;
  res.lists.map(o => {
    o.cards.map(k => {
     k.rows.map(j => {
       mrnOptions.push({
         value: j.mrn,
         label: j.mrn,
         mrn: j.mrn,
         lastKnownLocation: j.lastknownlocationname
       })
       ;
       assetOptions.push({
         value: j.assetid,
         label: j.assetid,
         mrn: j.mrn,
         lastKnownLocation: j.lastknownlocationname
       })
       ;
       lastNameOptions.push({
         value: j.lastname,
         label: j.lastname,
         mrn: j.mrn,
         lastKnownLocation: j.lastknownlocationname
       })
       ;
       fullNameOptions.push({
         value: `${ j.firstname } ${ j.lastname }`,
         label: `${ j.firstname } ${ j.lastname }`,
         mrn: j.mrn,
         lastKnownLocation: j.lastknownlocationname
       })
     })
    })
  });
  return {
    groupedOptions : [{
      label: 'MRN',
      options: mrnOptions
    },{
      label: 'Last Name',
      options: lastNameOptions
    },{
      label: 'Full Name',
      options: fullNameOptions
    },{
      label: 'Asset ID',
      options: assetOptions
    }]
  }
};

export default connect()(Search);