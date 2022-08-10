import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import { response as mockData } from './mocks/mockData';
import userEvent from '@testing-library/user-event';
import { columns } from '../helpers/constants';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
}

describe('3 - Crie um filtro para valores numéricos na tabela: ', () => {
  beforeEach(async () => {
    mockFetch();

    await act(async () =>{
      render(<App />)
    } )
  });

  afterEach(() => jest.clearAllMocks());

  test('Testa se renderiza o select de colunas e suas opções', () => {
    const columnFilter = screen.getByTestId('column-filter');

    expect(columnFilter).toBeInTheDocument();

    userEvent.click(columnFilter);

    columns.forEach(column => expect(screen.getByText(column)).toBeInTheDocument());
  });

  test('Testa se renderiza o select de comparação e suas opções', () => {
    const comparisonFilter = screen.getByTestId('comparison-filter');

    expect(comparisonFilter).toBeInTheDocument();

    const biggerThen = screen.getByText(/maior que/i);
    const lessThan = screen.getByText(/menor que/i);
    const toEqual = screen.getByText(/igual a/i);

    expect(biggerThen).toBeInTheDocument();
    expect(lessThan).toBeInTheDocument();
    expect(toEqual).toBeInTheDocument();
  });

  test('Testa se renderiza um input de números para o valor do filtro', () => {
    const inputNumbers = screen.getByTestId('value-filter');

    expect(inputNumbers).toBeInTheDocument;
  });

  test('Testa se existe um botão para adicionar a filtragem', () => {
    const filterButton = screen.getByTestId('button-filter');

    expect(filterButton).toBeInTheDocument();
  });

  test('Test se utiliza o botão de filtrar sem alterar os valores iniciais dos inputs de filtro', () => {
    const filterButton = screen.getByTestId('button-filter');
    const table = screen.getByRole('table');

    userEvent.click(filterButton);

    expect(table.rows.length).toBe(9);
  });

  test('Testa se o filtro "menor que" funciona', () => {
    const table = screen.getByRole('table');
    const filterButton = screen.getByTestId('button-filter');
    const inputNumbers = screen.getByTestId('value-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');

    inputNumbers.value = 40
    columnFilter.value = 'surface_water';
    comparisonFilter.value = 'menor que';

    userEvent.click(filterButton);

    expect(table.rows.length).toBe(7);
  });

  test('Testa se o filtro "maior que" funciona', () => {
    const filterButton = screen.getByTestId('button-filter');
    const inputNumbers = screen.getByTestId('value-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const table = screen.getByRole('table');

    inputNumbers.value = 8900
    columnFilter.value = 'diameter';
    comparisonFilter.value = 'maior que';

    userEvent.click(filterButton);

    expect(table.rows.length).toBe(8);
  });

  test('Testa se o filtro "igual a" funciona', () => {
    const filterButton = screen.getByTestId('button-filter');
    const inputNumbers = screen.getByTestId('value-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const table = screen.getByRole('table');

    inputNumbers.value = 200000
    columnFilter.value = 'population';
    comparisonFilter.value = 'igual a';

    userEvent.click(filterButton);

    expect(table.rows.length).toBe(2);
  });
});
