import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/user';
import './SignIn.scss';

class SignIn extends Component {
  constructor (props) {
    super (props);
    this.state = {
      username: '',
      password: '',
      submitted: false
    }
  }
  ;
  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({[name] : value });
  }
  ;
  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({ submitted: true });
    const { dispatch } = this.props;
    const { username, password } = this.state;
    if (username && password) {
      dispatch(login(username, password));
      //this.props.login(username, password);
    }
  }
  ;
  render () {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <html>
        <body>
          <div className="peers ai-s fxw-nw h-100vh">
            <div
              className="d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv"
              style={{ backgroundImage: 'url(./static/wcmc_2_1.jpg)' }}
            >
              <div className="pos-a centerXY">
                <div
                  className="bgc-white bdrs-50p pos-r"
                >
                </div>
              </div>
            </div>
            <div
              className="col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r"
              style={{ minWidth: '320px' }}
            >
              <h4 className="fw-300 c-grey-900 mB-40">Login</h4>
              <form name='form' onSubmit={ this.handleSubmit }>
                <div className={ 'form-group' + (submitted && !username ? ' has-error' : '')}>
                  <label className="text-normal text-dark">Username</label>
                  <input
                    type="text"
                    className='form-control'
                    name='username'
                    value={ username }
                    onChange={ this.handleChange }
                    placeholder="cwid"
                  ></input>
                  { submitted && !username && <div className='help-block'>Username is required</div> }
                </div>
                <div className="form-group">
                  <label className="text-normal text-dark">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    name='password'
                    value={ password }
                    onChange={ this.handleChange  }
                  ></input>
                  { submitted && !password && <div className='help-block'>Password is required</div> }
                </div>
                <div className="form-group">
                  <div className="peers ai-c jc-sb fxw-nw">
                    <div className="peer">
                      <div className="checkbox checkbox-circle checkbox-info peers ai-c">
                      </div>
                    </div>
                    <div className="peer">
                      <button className="btn btn-primary">Login</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </body>
      </html>
    )
  }
}

export default connect()(SignIn);