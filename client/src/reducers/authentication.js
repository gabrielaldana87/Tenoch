
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
  loggedIn: true,
  user
} : {} ;

const authentication = (state = initialState, action) => {
  switch ( action.type ) {
  case 'USERS_LOGIN_REQUEST':
    return {
      ...state,
      loggingIn: true,
      error: null
    }
    ;
  case 'USERS_LOGIN_SUCCESS':
    const { cn, title, displayName, name, mail, adGroup } = action.payload;
    return {
      ...state,
      loggedIn: true,
      user: {
        cn, title, displayName, name, mail, adGroup
      }
    }
    ;
  case 'USERS_LOGIN_FAILURE':
    return {
      ...state,
      error: action.payload.error,
      user: {
      }
    }
    ;
  case 'LOGOUT':
    return {
      user: {}
    }
    ;
  default:
    return state;
  }
};

export default authentication;