const initialState = {
  data: [],
  loading: false,
  error: null
};

const trail = ( state = initialState, action ) => {
  switch (action.type) {
  case 'PATIENT_PATH_BEGIN':
    return {
      ...state,
      loading: true,
      error: null
    }
    ;
  case 'PATIENT_PATH_SUCCESS':
    const { elements } = action.payload;
    return {
      ...state,
      loading: false,
      data: elements
    }
    ;
  case 'PATIENT_PATH_FAILURE':
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      data: {}
    }
    ;
  default:
    return state;
  }
};

export default trail;