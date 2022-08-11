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

    expect(columnFilter.options[0].value).toBe(columns[0]);
    expect(columnFilter.options[1].value).toBe(columns[1]);
    expect(columnFilter.options[2].value).toBe(columns[2]);
    expect(columnFilter.options[3].value).toBe(columns[3]);
    expect(columnFilter.options[4].value).toBe(columns[4]);
  });

  it('', () => {
    const comparisonFilter = screen.getByTestId('comparison-filter');

    expect(comparisonFilter.options.length).toBe(3);

    expect(screen.getByText(/operadores:/i)).toBeInTheDocument();
    expect(comparisonFilter.options[0].value).toBe('maior que');
    expect(comparisonFilter.options[1].value).toBe('menor que');
    expect(comparisonFilter.options[2].value).toBe('igual a');

    userEvent.selectOptions(comparisonFilter, 'maior que');

    expect(comparisonFilter.value).toBe('maior que');

    userEvent.selectOptions(comparisonFilter, 'menor que');

    expect(comparisonFilter.value).toBe('menor que');

    userEvent.selectOptions(comparisonFilter, 'igual a');

    expect(comparisonFilter.value).toBe('igual a');
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
    const comparisonFilter = screen.getByTestId('comparison-filter');

    userEvent.selectOptions(comparisonFilter, 'menor que');

    userEvent.click(filterButton);

    expect(table.rows.length).toBe(1);
  });

  test('Testa se o filtro "igual a" funciona', () => {
    const filterButton = screen.getByTestId('button-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const table = screen.getByRole('table');

    userEvent.selectOptions(comparisonFilter, 'igual a');

    userEvent.click(filterButton);

    expect(table.rows.length).toBe(1);
  });
});
