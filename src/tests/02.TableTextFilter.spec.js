import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { response as mockData } from './mocks/mockData';
import userEvent from '@testing-library/user-event';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mockData),
    }));
}

describe('2 - Crie um filtro de texto para a tabela', () => {
  beforeEach(mockFetch);
  afterEach(() => jest.clearAllMocks());

  test('Testa se existe um campo de texto', () => {
    render(<App />);

    const inputText = screen.getByTestId('name-filter');

    expect(inputText).toBeInTheDocument();
  });

  test('Testa se são filtrados os planetas que possuem a letra "o" no nome', () => {
    render(<App />);
    const inputText = screen.getByTestId('name-filter');

    userEvent.type(inputText, 'o')

    const planets = mockData.filter((planet) => planet.name.includes('o'));

    planets.forEach((planet) => expect(screen.getByRole('cell', /`${planet}`/i)).toBeInTheDocument());

    /* expect(screen.getByRole('cell', { name: /coruscant/i })).toBeInTheDocument;
    expect(screen.getByRole('cell', { name: /Dagobah/i })).toBeInTheDocument;
    expect(screen.getByRole('cell', { name: /Endor/i })).toBeInTheDocument;
    expect(screen.getByRole('cell', { name: /Hoth/i })).toBeInTheDocument;
    expect(screen.getByRole('cell', { name: /Kamino/i })).toBeInTheDocument;
    expect(screen.getByRole('cell', { name: /Naboo/i })).toBeInTheDocument;
    expect(screen.getByRole('cell', { name: /Tatooine/i })).toBeInTheDocument; */
  });

  test('Testa se são filtrados os planetas que possuem a letra "oo" no nome', () => {
    render(<App />);
    const inputText = screen.getByTestId('name-filter');

    userEvent.type(inputText, 'oo')

    const planetNaboo = screen.getByRole('cell', { name: /Naboo/i });
    const planetTatooine = screen.getByRole('cell', { name: /Tatooine/i });

    expect(planetNaboo).toBeInTheDocument;
    expect(planetTatooine).toBeInTheDocument;
  });

  test('Testa se ao digitar tatoo é filtrado o planeta Tatooine', () => {
    render(<App />);
    const inputText = screen.getByTestId('name-filter');

    userEvent.type(inputText, 'taoo')

    const planetTatooine = screen.getByRole('cell', { name: /Tatooine/i });

    expect(planetTatooine).toBeInTheDocument;
  });

  test('Realiza os dois filtros acima em sequência e após, testa a remoção do filtro por texto', () => {
    render(<App />);
    const inputText = screen.getByTestId('name-filter');

    userEvent.type(inputText, 'oo')

    const planetNaboo = screen.getByRole('cell', { name: /Naboo/i });
    const planetTatooine = screen.getByRole('cell', { name: /Tatooine/i });

    expect(planetNaboo).toBeInTheDocument;
    expect(planetTatooine).toBeInTheDocument;

    userEvent.type(inputText, '{backspace}');

    const planets = mockData.filter((planet) => planet.name.includes('o'));

    planets.forEach((planet) => expect(screen.getByRole('cell', /`${planet}`/i)).toBeInTheDocument());

    userEvent.type(inputText, '{backspace}');

    const table = screen.getByRole('table');

    expect(table.lastChild.tagName).toBe('TBODY');
    expect(table.lastChild.children.length).toBe(10);
  });
});
