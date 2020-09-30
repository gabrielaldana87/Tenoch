const ADD_PATIENT_BEGIN = 'ADD_PATIENT_BEGIN';
const ADD_PATIENT_SUCCESS = 'ADD_PATIENT_SUCCESS';
const ADD_PATIENT_FAILURE = 'ADD_PATIENT_FAILURE';

export const addPatientBegin = () => ({ type: ADD_PATIENT_BEGIN });
export const addPatientSuccess = patient => ({ type: ADD_PATIENT_SUCCESS, payload: patient });
export const addPatientFailure = error => ({ type: ADD_PATIENT_FAILURE, payload: { error } });

export const addPatient = message => {
  console.log(message)
  return dispatch => {
    dispatch(addPatientBegin());
    return fetch('/api/patients')
      .then(handleErrors)
      .then( res => res.json())
      .then( patient => {
        dispatch(addPatientSuccess(patient));
        return patient;
      })
      .catch( error => dispatch(addPatientFailure( error )));
  }
};

// Handle HTTP errors since fetch won't.
const handleErrors = res => {
  if ( !res.ok ) {
    throw Error(res.statusText);
  }
  return res;
};

