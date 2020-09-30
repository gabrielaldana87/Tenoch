import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Welcome.scss';

class Welcome extends Component {
  render () {
    const { user } = this.props;
    return (
      <div id ='overview-right-column' className='mainColumn widgetCol col-md-15'>
        <div className='CardView'>
         <header className='cardHeader'>
           <h3>Welcome { user.displayName }</h3>
         </header>
        </div>
        <div className='CardView'>
          <div className='cardContent'>
            <div>
              <div>
                <table>
                  <tr>
                    <td>
                      <img></img>
                    </td>
                    <td>
                      <div>
                        <span className='text-prompt'>
                          To access the RFID application for the Infusion Team @ DHK, please write to gaa9034@nyp.org
                        </span>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ ... state.authentication });

export default connect(mapStateToProps)(Welcome);