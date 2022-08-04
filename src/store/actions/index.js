import {
  ADD_FILTER,
  REMOVE_FILTER,
  FILTER_BY_NUMERIC_VALUES,
  APPLY_NUMERIC_FILTER,
  VERIFY_HAVE_FILTER,
  REMOVE_ALL_FILTERS,
  APPLY_RESET_FILTERS,
} from './actionTypes';

export const addFilterAction = (payload) => ({
  type: ADD_FILTER, payload,
});

export const removeFilterAction = (payload) => ({
  type: REMOVE_FILTER,
  payload,
});

export const filterByNumericValuesAction = (payload) => ({
  type: FILTER_BY_NUMERIC_VALUES, payload,
});

export const applyNumericFilterAction = () => ({ type: APPLY_NUMERIC_FILTER });

export const haveFilterAction = () => ({ type: VERIFY_HAVE_FILTER });

export const removeAllFiltersAction = () => ({ type: REMOVE_ALL_FILTERS });

export const applyResetFilterAction = () => ({ type: APPLY_RESET_FILTERS });
