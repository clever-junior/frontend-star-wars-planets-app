import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { response as mockData } from './mocks/mockData';
import App from '../App';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
}

describe('1 - Faça uma requisição para API Star Wars no endpoint /planets', () => {
  beforeEach(async () => {
    mockFetch();

    await act(async () =>{
    render(<App />)
    } )
  });

  afterEach(() => jest.clearAllMocks());

  test('Testa se uma requisição para a API é realizada', async () => {
    expect(await global.fetch).toHaveBeenCalledTimes(1);
    expect(await global.fetch).toBeCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
  });

  test('Testa se é renderizada uma tabela e se ela tem 13 colunas ', async () => {
    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
    expect(table.firstChild.tagName).toBe('THEAD');
    expect(table.firstChild.firstChild.children.length).toBe(13);
  });

  test('Testa se a tabela tem uma linha para cada planeta retornado', async () => {
     const table = screen.getByRole('table');

     expect(table.lastChild.tagName).toBe('TBODY');
     expect(screen.getAllByRole('row').length).toBe(11);
  });
});
