import React from 'react';
import { render, screen, act, getAllByTestId } from '@testing-library/react';
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

describe('5 -', () => {
  beforeEach(async () => {
    mockFetch();

    await act(async () =>{
    render(<App />)
    } )
  });

  afterEach(() => jest.clearAllMocks());

  it('verifica a ordenação inicial', () => {
    const expectedPlanets = ['Alderaan', 'Bespin', 'Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine', 'Yavin IV'];
    const planets = screen.getAllByTestId('planet-name');

    expect(screen.getByText(/operadores:/i)).toBeInTheDocument();
    expect(screen.getByText(/descendente/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {  name: /ordenar/i})).toBeInTheDocument();
    planets.forEach((el, index) => expect(el.firstChild.innerHTML).toContain(expectedPlanets[index]));
  });

  it('Verifica se todos os inputs de ordenação estão sendo renderizados', () => {
    const columnSort = screen.getByTestId('column-sort');
    const desc = screen.getByTestId('column-sort-input-desc');
    const sortBtn = screen.getByTestId('column-sort-button');
    const asc = screen.getByTestId('column-sort-input-asc');

    expect(columnSort).toBeInTheDocument();
    expect(asc).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
    expect(sortBtn).toBeInTheDocument();
  });

  it('Ordene os planetas do maior período orbital para o menor período orbital', () => {
    const columnSort = screen.getByTestId('column-sort');
    const desc = screen.getByTestId('column-sort-input-desc');
    const sortBtn = screen.getByTestId('column-sort-button');
    const planets = screen.getAllByTestId('planet-name');

    userEvent.selectOptions(columnSort, 'orbital_period');

    userEvent.click(desc);

    userEvent.click(sortBtn)

    const expectedPlanets = ['Bespin', 'Yavin IV', 'Hoth', 'Kamino', 'Endor', 'Coruscant', 'Alderaan', 'Dagobah', 'Naboo', 'Tatooine'];

    planets.forEach((el, index) => expect(el.key).toContain(expectedPlanets[index]));
  });

  it('Ordene os planetas do menor diâmetro para o maior diâmetro', () => {
    const columnSort = screen.getByTestId('column-sort');
    const asc = screen.getByTestId('column-sort-input-asc');
    const sortBtn = screen.getByTestId('column-sort-button');
    const planets = screen.getAllByTestId('planet-name');

    userEvent.selectOptions(columnSort, 'diameter');

    userEvent.click(asc);

    userEvent.click(sortBtn)

    const expectedPlanets =['Endor', 'Hoth', 'Dagobah', 'Yavin IV', 'Tatooine', 'Naboo', 'Coruscant', 'Alderaan', 'Kamino', 'Bespin'];

    console.log(planets[0].key);

    planets.forEach((el, index) => expect(el.key).toContain(expectedPlanets[index]));
  });

  it('Ordene os planetas do menos populoso para o mais populoso', () => {
    const columnSort = screen.getByTestId('column-sort');
    const desc = screen.getByTestId('column-sort-input-desc');
    const sortBtn = screen.getByTestId('column-sort-button');
    const planets = screen.getAllByTestId('planet-name');
    const table = screen.getByRole('table');

    userEvent.selectOptions(columnSort, 'population');

    userEvent.click(desc);

    userEvent.click(sortBtn);

    const expectedPlanets = ['Coruscant', 'Naboo', 'Alderaan', 'Kamino', 'Endor', 'Bespin', 'Tatooine', 'Yavin IV'];

    planets.forEach((el, index) => expect(el.key).toContain(expectedPlanets[index]));
  });

  it('', () => {
    const desc = screen.getByTestId('column-sort-input-desc');
    const asc = screen.getByTestId('column-sort-input-asc');

    expect(desc.checked).toBe(false);
    expect(asc.checked).toBe(false);

    userEvent.click(desc);

    expect(desc.checked).toBe(true);
    expect(asc.checked).toBe(false);

    userEvent.click(asc);

    expect(desc.checked).toBe(false);
    expect(asc.checked).toBe(true);
  })
});
