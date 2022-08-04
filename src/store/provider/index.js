import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context';
import filtersReducer, { initialState } from '../reducers/filtersReducer';
import fetchPlanets from '../../services/api';

export default function Provider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [resetFilters, setResetFilters] = useState(false);
  const [state, dispatch] = useReducer(filtersReducer, initialState);

  useEffect(() => {
    async function getApiData() {
      const apiData = await fetchPlanets();
      const dataResults = apiData.results;
      dataResults.forEach((planet) => delete planet.residents);
      setData(dataResults);
    }
    getApiData();
  }, []);

  const contextValues = {
    data,
    resetFilters,
    filterByName: {
      name,
    },
    state,
    setters: {
      setName,
      setResetFilters,
      dispatch,
    },
  };

  return (
    <AppContext.Provider value={ contextValues }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};
