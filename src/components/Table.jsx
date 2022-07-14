import React, { useContext, useEffect, useState } from 'react';
import { headers } from '../helpers/constants';
import AppContext from '../store/context';

export default function Table() {
  const [planets, setPlanets] = useState([]);

  const {
    data,
    filters: {
      filterByName: { name },
      filterByNumericValues: numericValues,
      applyNumericFilter,
      setApplyNumericFilter,
    },
  } = useContext(AppContext);

  const { column, comparison, value } = numericValues[0];

  useEffect(() => {
    function filterByName() {
      if (data.length !== 0) {
        const result = data
          .filter((planet) => (
            planet.name.includes(name)));
        setPlanets(result);
      }
    }
    filterByName();
  }, [name, data]);

  useEffect(() => {
    function filterByNumericValues() {
      switch (comparison) {
      case 'maior que': {
        const result = data
          .filter((planet) => +planet[column] > value);
        setPlanets(result);
        setApplyNumericFilter(false);
      } break;
      case 'menor que': {
        const result = data
          .filter((planet) => +planet[column] < value);
        setPlanets(result);
        setApplyNumericFilter(false);
      } break;
      case 'igual a': {
        const result = data
          .filter((planet) => planet[column] === value);
        setPlanets(result);
        setApplyNumericFilter(false);
      } break;
      default: break;
      }
    }
    if (applyNumericFilter) filterByNumericValues();
  }, [column, value, comparison, data, applyNumericFilter, setApplyNumericFilter]);

  return (
    <table style={ { border: '2px solid black' } }>
      <thead>
        <tr>
          {
            headers.map((title, index) => (
              <th key={ `title=${index}` }>
                {title}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          planets.length && planets
            .map((planet) => (
              <tr key={ planet.name }>
                {
                  Object.values(planet)
                    .map((planetValue, index) => (
                      <td key={ `planetValue=${index}` }>{planetValue}</td>
                    ))
                }
              </tr>))
        }
      </tbody>
    </table>
  );
}
