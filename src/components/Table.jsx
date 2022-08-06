import React, { useContext } from 'react';
import { headers } from '../helpers/constants';
import AppContext from '../store/context';
import {
  applyNameFilter,
  applyNumericFilter,
} from '../helpers/filters';

export default function Table() {
  const {
    data,
    state,
    resetFilters,
    setters: { setResetFilters },
    filterByName: { name },
  } = useContext(AppContext);

  const { filterByNumericValues: numericValues } = state;

  const newData = state.haveFilter
    ? applyNumericFilter(data, numericValues)
    : applyNameFilter(data, name);

  if (state.haveFilter || resetFilters) {
    setResetFilters(false);
  }

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
          newData
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
