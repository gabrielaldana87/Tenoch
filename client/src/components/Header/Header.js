import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../actions/user';
import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false
    }
  }
  ;
  handleChange = evt => {
    const { dispatch } = this.props;
    evt.preventDefault();
    dispatch(logout);
    this.setState({ navigate : true });
  }
  ;
  render () {
    const { navigate }  = this.state;
    const { user } = this.props;
    return navigate ? <Redirect to='/signin' push={ true } /> : (
      <div className='header navbar'>
        <div className='header-container'>
          <ul className='nav-right'>
            <li className='dropdown'>
              <a href='' className='dropdown-toggle no-after peers fxw-nw ai-c lh-1' datatoggle='dropdown'>
                <div className='peer mR-10'>
                </div>
                <div className='peer'>
                  <span className='fsz-sm c-grey-900'>{ user.displayName }</span>
                </div>
                <div className='peer'>
                  <button
                    className='logout'
                    onClick={ this.handleChange }
                  >Logout</button>
                </div>
              </a>
            </li>
          </ul>
          <img className='img-responsive' src='static/footer-logo-nyp.png'></img>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({... state.authentication });

export default connect(mapStateToProps)(Header);