import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import { response as mockData } from './mocks/mockData';
import userEvent from '@testing-library/user-event';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
}

describe('2 - Crie um filtro de texto para a tabela', () => {
  beforeEach(async () => {
    mockFetch();

    await act(async () =>{
    render(<App />)
    } )
  });

  afterEach(() => jest.clearAllMocks());

  test('Testa se existe um campo de texto', () => {
    const inputText = screen.getByTestId('name-filter');

    expect(inputText).toBeInTheDocument();
  });

  test('Testa se são filtrados os planetas que possuem a letra "o" no nome', () => {
    const inputText = screen.getByTestId('name-filter');

    userEvent.type(inputText, 'o')

    const planets = mockData.results.filter((planet) => planet.name.includes('o'));

    planets.forEach((planet) => expect(screen.getByRole('cell', planet)).toBeInTheDocument());
  });

  test('Testa se são filtrados os planetas que possuem a letra "oo" no nome', () => {
    const inputText = screen.getByTestId('name-filter');

    userEvent.type(inputText, 'oo')

    const planetNaboo = screen.getByRole('cell', { name: /naboo/i });
    const planetTatooine = screen.getByRole('cell', { name: /tatooine/i });

    expect(planetNaboo).toBeInTheDocument;
    expect(planetTatooine).toBeInTheDocument;
  });

  test('Testa se ao digitar tatoo é filtrado o planeta Tatooine', () => {
    const inputText = screen.getByTestId('name-filter');

    userEvent.type(inputText, 'Tatoo')

    const planetTatooine = screen.getByRole('cell', { name: /Tatooine/i });

    expect(planetTatooine).toBeInTheDocument;
  });

  test('Realiza os dois filtros acima em sequência e após, testa a remoção do filtro por texto', () => {
    const inputText = screen.getByTestId('name-filter');

    userEvent.type(inputText, 'oo')

    const planetNaboo = screen.getByRole('cell', { name: /Naboo/i });
    const planetTatooine = screen.getByRole('cell', { name: /Tatooine/i });

    expect(planetNaboo).toBeInTheDocument;
    expect(planetTatooine).toBeInTheDocument;

    userEvent.type(inputText, '{backspace}');

    const planets = mockData.results.filter((planet) => planet.name.includes('o'));

    planets.forEach((planet) => expect(screen.getByRole('cell', planet)).toBeInTheDocument());

    userEvent.type(inputText, '{backspace}');

    const table = screen.getByRole('table');

    expect(table.lastChild.tagName).toBe('TBODY');
    expect(table.lastChild.children.length).toBe(10);
  });
});
