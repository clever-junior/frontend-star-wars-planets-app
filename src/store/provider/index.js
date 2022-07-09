import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context';
import fetchPlanets from '../../services/api';

export default function Provider({ children }) {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    async function getApiData() {
      const data = await fetchPlanets();
      setApiData(data.results);
    }
    getApiData();
  }, []);

  const contextValue = {
    apiData,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
