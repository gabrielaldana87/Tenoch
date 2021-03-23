const initialState = {
  data: []
};

const filter = (state = initialState, action) => {
  switch (action.type) {
  case 'FILTER_SELECTION' :
    return {
      ...state,
      data: action.payload
    }
    ;
  default :
    return state;
  }
};

export default filter;