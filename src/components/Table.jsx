import React, { useContext, useEffect, useState } from 'react';
import { headers } from '../helpers/constants';
import AppContext from '../store/context';
import {
  applyNameFilter,
  applyNumericFilter,
  applySortOrder,
} from '../helpers/filters';

export default function Table() {
  const [newData, setNewData] = useState([]);
  const {
    data,
    state,
    resetFilters,
    order,
    applySort,
    setters: { setResetFilters, setApplySort },
    filterByName: { name },
  } = useContext(AppContext);

  const { filterByNumericValues: numericValues } = state;

  if (state.haveFilter || resetFilters) {
    setResetFilters(false);
  }

  useEffect(() => {
    setNewData(state.haveFilter
      ? applyNumericFilter(data, numericValues)
      : applyNameFilter(data, name, applySort, order));

    if (applySort) {
      setNewData(applySortOrder(data, order));
    }
  }, [
    applySort,
    state.haveFilter,
    data,
    name,
    order,
    numericValues,
    setApplySort,
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
          newData
            .map((planet) => (
              <tr key={ planet.name } data-testid="planet-name">
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
