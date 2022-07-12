import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import Table from '../components/Table';
import { response as mockData } from './mocks/mockData';
import Provider from '../store/provider';
import App from '../App';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
}

describe('1 - Faça uma requisição para API Star Wars no endpoint /planets', () => {
  afterEach(() => jest.clearAllMocks());
  beforeEach(mockFetch);

  test('Testa se uma requisição para a API é realizada', async () => {
    render(<App />);

    expect(await global.fetch).toHaveBeenCalledTimes(1);
    expect(await global.fetch).toBeCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
  });

  test('Testa se é renderizada uma tabela e se ela tem 13 colunas ', async () => {
    await render(<App />);

    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
    expect(table.firstChild.tagName).toBe('THEAD');
    expect(table.firstChild.firstChild.children.length).toBe(13);
  });

  test('Testa se a tabela tem uma linha para cada planeta retornado', async () => {
     await render(<App />);

     const table = screen.getByRole('table');


     expect(table.lastChild.tagName).toBe('TBODY');
     expect(screen.getAllByRole('row').length).toBe(11);
  });
});
