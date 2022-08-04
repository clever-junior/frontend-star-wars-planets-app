import {
  ADD_FILTER,
  APPLY_NUMERIC_FILTER,
  FILTER_BY_NUMERIC_VALUES,
  VERIFY_HAVE_FILTER,
  REMOVE_FILTER,
  REMOVE_ALL_FILTERS,
  APPLY_RESET_FILTERS,
} from '../actions/actionTypes';

export const initialState = {
  filterByNumericValues: [
    {
      column: 'population',
      comparison: 'maior que',
      value: '0',
    },
  ],
  applyNumericFilter: false,
  applyResetFilter: false,
  haveFilter: false,
};

const filtersReducer = (state = initialState, action) => {
  const {
    filterByNumericValues, applyNumericFilter, haveFilter, applyResetFilter,
  } = state;
  switch (action.type) {
  case FILTER_BY_NUMERIC_VALUES:
    return {
      ...state,
      filterByNumericValues: [{
        column: action.payload.column,
        comparison: action.payload.comparison,
        value: action.payload.value,
      }],
    };
  case ADD_FILTER:
    return {
      ...state, filterByNumericValues: filterByNumericValues.concat(action.payload),
    };
  case REMOVE_FILTER:
    return {
      ...state,
      filterByNumericValues: filterByNumericValues
        .filter((_filter, index) => index !== action.payload),
    };
  case APPLY_NUMERIC_FILTER:
    return {
      ...state, applyNumericFilter: !applyNumericFilter,
    };
  case APPLY_RESET_FILTERS:
    return {
      ...state, applyResetFilter: !applyResetFilter,
    };
  case VERIFY_HAVE_FILTER:
    return {
      ...state,
      haveFilter: !haveFilter,
    };
  case REMOVE_ALL_FILTERS:
    return {
      ...state,
      filterByNumericValues: [{
        column: 'population',
        comparison: 'maior que',
        value: '0',
      }],
      applyNumericFilter: false,
      haveFilter: false,
    };
  default: return state;
  }
};

export default filtersReducer;
