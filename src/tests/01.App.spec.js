import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Table from '../components/Table';
import { response as mockData } from './mocks/mockData';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mockData),
    }));
}

describe('1 - Faça uma requisição para API Star Wars no endpoint /planets', () => {
  beforeEach(mockFetch);
  afterEach(() => jest.clearAllMocks());

  test('Testa se uma requisição para a API é realizada', () => {
    render(<App />);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
  });

  test('Testa se é renderizada uma tabela e se ela tem 13 colunas ', () => {
    render(<Table />);

    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
    expect(table.firstChild.tagName).toBe('THEAD');
    expect(table.firstChild.children.length).toBe(13);
  });

  test('Testa se a tabela tem uma linha para cada planeta retornado', () => {
    render(<Table />);

    const table = screen.getByRole('table');

    expect(table.lastChild.tagName).toBe('TBODY');
    expect(table.lastChild.children.length).toBe(10);
  });
});
