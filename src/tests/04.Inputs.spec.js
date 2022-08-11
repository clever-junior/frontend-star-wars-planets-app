import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import { response as mockData } from './mocks/mockData';
import userEvent from '@testing-library/user-event';
import { columns, headers, initialFilterValuesState, operators } from '../helpers/constants';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
}

const TOTAL_ROWS_COUNT = 10 + 1;
const FILTERED_ROWS_COUNT = 9;

describe('2 - Crie um filtro de texto para a tabela', () => {
  beforeEach(async () => {
    mockFetch();

    await act(async () =>{
    render(<App />)
    } )
  });

  afterEach(() => jest.clearAllMocks());

  it('', () => {
    const valueFilter = screen.getByTestId('value-filter');

    expect(valueFilter).toBeInTheDocument();
    expect(valueFilter.value).toBe('0');
    expect(valueFilter.type).toBe('number');
    expect(screen.getByRole('spinbutton')).toBeInTheDocument();

    userEvent.type(valueFilter, '5');

    expect(valueFilter.value).toBe('05');

    userEvent.type(valueFilter, 'asd');

    expect(valueFilter.value).toBe('05');
  });

  it('', () => {
    const filterButton = screen.getByTestId('button-filter');

    userEvent.click(filterButton);
    userEvent.click(filterButton);

    const filter = screen.getAllByTestId('filter');

    expect(filter.length).toBe(2);
    expect(screen.getByText(/population maior que 0/i)).toBeInTheDocument();
    expect(screen.getByText(/orbital_period maior que 0/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /x/i }).length).toBe(2);

  });

  it('', () => {
    const filterButton = screen.getByTestId('button-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const table = screen.getByRole('table');

    userEvent.click(filterButton);

    expect(columnFilter.options.length).toBe(4);
    expect(columnFilter.options[0].value).not.toBe(columns[0]);

    const deleteBtn = screen.getByRole('button', { name: /x/i });

    expect(deleteBtn).toBeInTheDocument();

    userEvent.click(deleteBtn);

    expect(deleteBtn).not.toBeInTheDocument();
    expect(columnFilter.options.length).toBe(5);
    expect(columnFilter.options[0].value).toBe(columns[0]);
    expect(table.rows.length).toBe(11);

    userEvent.selectOptions(columnFilter, 'diameter');

    expect(columnFilter.value).toBe('diameter');

    userEvent.selectOptions(columnFilter, 'surface_water');

    expect(columnFilter.value).toBe('surface_water');
  });

  it('', () => {
    const filterButton = screen.getByTestId('button-filter');
    const table = screen.getByRole('table');

    userEvent.click(filterButton);

    expect(table.rows.length).toBe(FILTERED_ROWS_COUNT);

    const removeAllBtn = screen.getByTestId('button-remove-filters');

    expect(removeAllBtn).toBeInTheDocument();

    userEvent.click(removeAllBtn);

    expect(table.rows.length).toBe(TOTAL_ROWS_COUNT);
  });

  it('', () => {
    expect(headers.length).toBe(13);
    expect(Object.keys(initialFilterValuesState).length).toBe(4);
    expect(operators.length).toBe(3);
  });
});
