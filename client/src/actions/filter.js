const FILTER_SELECTION = 'FILTER_SELECTION';

export const filterSelection = selection => ({ type: FILTER_SELECTION, payload: selection });

export const filterSelected = selection => {
  return dispatch => {
    dispatch(filterSelection(selection));
  }
};
