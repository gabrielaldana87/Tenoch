import React , { Component } from 'react';
import { timeFormat } from 'd3';
import './ResourceRow.scss';

class ResourceRow extends Component {
  render () {
    const
      { o, listId } = this.props,
      t = timeFormat('%I:%M %p'),
      style = { textTransform: 'capitalize' }
    ;
    return (
      <>
      {/*<strong className='encounter-info'>{ o.appt_status }</strong>*/}
        <div className='resource-box'>
          <strong className='encounter-info'>{ o.appt_status.text }</strong>
          {/*<div className='resource-tag'>*/}
            {/*{ o.prov_type.substr(0,1) }*/}
          {/*</div>*/}
          <p className='text-identifier schedule'>
            { o.prov_type.substr(0,1) === 'A' ?
              <>
                <strong className='resource-strong' style={ style }>{ o.prov_name.toLowerCase() }</strong>
                <strong> { o.appt_length } mins</strong><br></br>
                <span className='inner-span oversize'>APPT TIME</span><strong>{ t(o.scheduledts) }</strong><br></br>
              </>
               :
              <>
                <strong className='resource-strong' style={ style }>{ o.prc_name.toLowerCase() }</strong>
                <strong> { o.appt_length } mins</strong><br></br>
                <span className='inner-span oversize'>APPT TIME</span><strong>{ t(o.scheduledts) }</strong><br></br>
              </>
            }
          </p>
        </div>
      </>
    )
  }
}

export default ResourceRow;