import React, { useContext, useEffect, useState } from 'react';
import { headers, operators } from '../helpers/constants';
import { applyNumericFilterAction } from '../store/actions';
import AppContext from '../store/context';

export default function Table() {
  const [planets, setPlanets] = useState([]);
  const {
    data,
    state,
    resetFilters,
    setters: { dispatch, setResetFilters },
    filterByName: { name },
  } = useContext(AppContext);

  const { applyNumericFilter, filterByNumericValues } = state;

  useEffect(() => {
    if (resetFilters || !state.haveFilter) {
      setPlanets(data);
      setResetFilters(false);
    }
  }, [resetFilters, data, setResetFilters, state]);

  useEffect(() => {
    function applyFilterByName() {
      if (data.length !== 0) {
        const newData = data.filter((planet) => planet.name.includes(name));
        setPlanets(newData);
      }
    }
    applyFilterByName();
  }, [data, name]);

  useEffect(() => {
    function applyFilter() {
      filterByNumericValues.forEach((filter) => {
        switch (filter.comparison) {
        case operators[0]: {
          const newData = planets
            .filter((planet) => +planet[filter.column] > filter.value);
          setPlanets(newData);
        } break;
        case operators[1]: {
          const newData = planets
            .filter((planet) => +planet[filter.column] < filter.value);
          setPlanets(newData);
        } break;
        case operators[2]: {
          const newData = planets
            .filter((planet) => planet[filter.column] === filter.value);
          setPlanets(newData);
        } break;
        default: break;
        }
      });
    }

    if (applyNumericFilter) {
      applyFilter();
      dispatch(applyNumericFilterAction());
    }
  }, [
    planets,
    applyNumericFilter,
    dispatch,
    filterByNumericValues,
  ]);

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
          planets
            .map((planet) => (
              <tr key={ planet.name }>
                {
                  Object.values(planet)
                    .map((planetValue, index) => (
                      <td key={ `planetValue=${index}` }>
                        {planetValue}
                      </td>
                    ))
                }
              </tr>
            ))
        }
      </tbody>
    </table>
  );
}
