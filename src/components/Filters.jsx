import React, { useContext } from 'react';
import AppContext from '../store/context';
import { columns, operators } from '../helpers/constants';

export default function Filters() {
  const {
    filters: {
      filterByName: { setName },
      filterByNumericValues,
      onFilterBtnClick,
    },
  } = useContext(AppContext);

  const {
    column: inputColumn,
    setColumn,
    comparison: inputComparison,
    setComparison,
    value: inputValue,
    setValue,
  } = filterByNumericValues[0];

  return (
    <main>
      <section>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ ({ target: { value } }) => setName(value) }
        />
      </section>

      <section>
        <label htmlFor="columns-filter">
          Colunas:
          <select
            id="columns-filter"
            data-testid="column-filter"
            value={ inputColumn }
            onChange={ ({ target: { value } }) => setColumn(value) }
          >
            {
              columns.map((column, index) => (
                <option key={ `column=${index}` } value={ column }>
                  {column}
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="comparison-filter">
          Operadores:
          <select
            id="comparison-filter"
            data-testid="comparison-filter"
            value={ inputComparison }
            onChange={ ({ target: { value } }) => setComparison(value) }
          >
            {
              operators.map((operator, index) => (
                <option key={ `operator=${index}` } value={ operator }>
                  {operator}
                </option>
              ))
            }
          </select>
        </label>

        <input
          type="number"
          data-testid="value-filter"
          value={ inputValue }
          onChange={ ({ target: { value } }) => setValue(value) }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ onFilterBtnClick }
        >
          Filtrar
        </button>
      </section>
    </main>
  );
}
