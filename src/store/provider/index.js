import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context';
import fetchPlanets from '../../services/api';

export default function Provider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    async function getApiData() {
      const apiData = await fetchPlanets();
      const dataResults = apiData.results;

      dataResults.forEach((planet) => delete planet.residents);

      setData(dataResults);
    }
    getApiData();
  }, []);

  const headers = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];

  const contextValue = {
    data,
    table: { headers },
    filters: {
      filterByName: {
        name,
        setName,
      },
    },
  };

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};
