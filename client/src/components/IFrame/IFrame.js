import React from 'react';
import './IFrame.scss';
import { href } from './config.json';
const IFrame = props => {
  console.log(href);
  return (
    <iframe src={ href.url } className='iframe-tableau'/>
  )
};

export default IFrame;