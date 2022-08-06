import React, { useContext, useState } from 'react';
import { columns, operators } from '../helpers/constants';
import {
  addFilterAction,
  applyNumericFilterAction,
  applyResetFilterAction,
  filterByNumericValuesAction,
  haveFilterAction,
  removeAllFiltersAction, removeFilterAction,
} from '../store/actions';
import AppContext from '../store/context';

export default function Inputs() {
  const [renderColumns, setRenderColumns] = useState(columns);
  const [inputColumn, setInputColumn] = useState('population');
  const [inputComparison, setInputComparison] = useState('maior que');
  const [inputValue, setInputValue] = useState(0);

  const {
    state,
    filterByName: { name },
    setters: { setName, dispatch, setResetFilters },
  } = useContext(AppContext);

  const onFilterBtnClick = () => {
    const filter = {
      column: inputColumn,
      comparison: inputComparison,
      value: inputValue,
    };

    if (state.haveFilter) {
      dispatch(addFilterAction(filter));
      dispatch(applyNumericFilterAction());
    } else {
      dispatch(filterByNumericValuesAction(filter));
      dispatch(applyNumericFilterAction());
      dispatch(haveFilterAction());
    }

    const updatedColumns = renderColumns.filter((column) => column !== inputColumn);
    setRenderColumns(updatedColumns);
    setInputColumn(updatedColumns[0]);
  };

  const onDeleteBtnClick = (index, column) => {
    const updateColumns = [column, ...renderColumns];
    setRenderColumns(updateColumns);
    dispatch(removeFilterAction(index));
    dispatch(applyResetFilterAction());

    if (state.filterByNumericValues.length <= 1) {
      dispatch(haveFilterAction());
    }
    setInputColumn(columns[0]);
  };

  const onRemoveFiltersBtnClick = () => {
    setRenderColumns(columns);
    setInputColumn(columns[0]);
    setResetFilters(true);
    dispatch(removeAllFiltersAction());
  };

  return (
    <main>
      <section>
        <input
          type="text"
          name="name"
          value={ name }
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
            name="column"
            value={ inputColumn }
            onChange={ ({ target: { value } }) => setInputColumn(value) }
          >
            {
              renderColumns.map((column, index) => (
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
            name="comparison"
            value={ inputComparison }
            onChange={ ({ target: { value } }) => setInputComparison(value) }
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
          name="value"
          value={ inputValue }
          onChange={ ({ target: { value } }) => setInputValue(value) }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => onFilterBtnClick() }
        >
          FILTRAR
        </button>

        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ onRemoveFiltersBtnClick }
        >
          REMOVER FILTROS
        </button>
      </section>

      {
        state.haveFilter && (
          <section>
            {
              state.filterByNumericValues.map((filters, index) => (
                <div key={ `filter=${index}` } data-testid="filter">
                  <span>
                    {`${filters.column} ${filters.comparison} ${filters.value}`}
                  </span>
                  <button
                    type="button"
                    onClick={ () => onDeleteBtnClick(index, filters.column) }
                  >
                    X
                  </button>
                </div>
              ))
            }
          </section>)
      }
    </main>
  );
}
