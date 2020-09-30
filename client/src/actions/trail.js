const PATIENT_PATH_BEGIN = 'PATIENT_PATH_BEGIN';
const PATIENT_PATH_SUCCESS = 'PATIENT_PATH_SUCCESS';
const PATIENT_PATH_FAILURE = 'PATIENT_PATH_FAILURE';

export const patientPathBegin = () => ({ type: PATIENT_PATH_BEGIN });
export const patientPathSuccess = trail => ({ type: PATIENT_PATH_SUCCESS, payload: trail });
export const patientPathFailure = error => ({ type: PATIENT_PATH_FAILURE, payload: { error }});

export const patientPath = assetId => {
  return dispatch => {
    dispatch(patientPathBegin());
    //return fetch(`http://nypnodedev.sis.nyp.org:3000/api/patientpath/${ assetId }`)\
    return fetch('./data/patientpath_starr3.json')
      .then(handleErrors)
      .then(res => res.json())
      .then( trail => {
        dispatch(patientPathSuccess(trail));
        return trail;
      })
      .catch( error => dispatch(patientPathFailure( error )));
  }
};

// Handle HTTP errors since fetch won't.
const handleErrors = res => {
  if ( !res.ok ) {
    throw Error(res.statusText);
  }
  return res;
};

