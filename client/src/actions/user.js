import { history } from '../helpers/history';

const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';

const LOGOUT = 'USERS_LOGOUT';

const request = user => ({ type: LOGIN_REQUEST, payload: user });
const success = user => ({ type: LOGIN_SUCCESS, payload: user });
const failure = error => ({ type: LOGIN_FAILURE, payload: { error } });

export const login = (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({ username, password })
  }
  ;
  return dispatch => {
    dispatch(request({ username }));
    return fetch(`/users/authenticate`, requestOptions)
      .then(handleResponse)
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(success(user));
        history.push('/');
        return user;
      })
      .catch( error => dispatch(failure(error)))
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  return { type: LOGOUT };
};

const handleResponse = res => {
  return res.text().then(text => {
    const data = text && JSON.parse(text);
    if (!res.ok) {
      if (res.status === 401) {
        logout();
        // location.reload(true);
      }
      const error = (data && data.message) || res.statusText;
      return Promise.reject(error);
    }
    if (data.message && !data.success) {
      const error = (data.message);
      return Promise.reject(error);
    }
    return data;
  });
};