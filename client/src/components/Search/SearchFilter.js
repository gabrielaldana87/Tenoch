import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { filterSelected } from '../../actions/filter';
import { options } from './searchfilteroptions.json';
import { colourStyles } from './searchFilterStyles';
import './SearchStyles.scss';

const SearchFilter = props => {

  useEffect(() => {
    const { dispatch } = props;
    dispatch(filterSelected({value: 'mrn', label: 'mrn'}));
  },[]);

  const onChange = val => {
    const { dispatch } = props;
    dispatch(filterSelected(val));
  };

  return (
    <div className='search-filter-query'>
      <Select
        options={ options }
        defaultValue={ options[0] }
        onChange={ e => onChange(e)}
        styles={ colourStyles }
      />
    </div>
  )

};

export default connect()(SearchFilter);