import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context';
import fetchPlanets from '../../services/api';

export default function Provider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [applyNumericFilter, setApplyNumericFilter] = useState(false);

  useEffect(() => {
    async function getApiData() {
      const apiData = await fetchPlanets();
      const dataResults = apiData.results;

      dataResults.forEach((planet) => delete planet.residents);

      setData(dataResults);
    }
    getApiData();
  }, []);

  const onFilterBtnClick = () => setApplyNumericFilter(!applyNumericFilter);

  const contextValue = {
    data,
    filters: {
      filterByName: {
        name,
        setName,
      },
      filterByNumericValues: [
        {
          column,
          setColumn,
          comparison,
          setComparison,
          value,
          setValue,
        },
      ],
      applyNumericFilter,
      setApplyNumericFilter,
      onFilterBtnClick,
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
