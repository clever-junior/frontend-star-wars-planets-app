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

    const population = screen.getByText(/population/i);
    const orbitalPeriod = screen.getByText(/orbital_period/i);
    const diameter = screen.getByText(/diameter/i)
    const rotationPeriod = screen.getByText(/rotation_period/i);
    const surfaceWater = screen.getByText(/surface_water/i);

    expect(population).toBeInTheDocument();
    expect(orbitalPeriod).toBeInTheDocument();
    expect(diameter).toBeInTheDocument();
    expect(rotationPeriod).toBeInTheDocument();
    expect(surfaceWater).toBeInTheDocument();
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

    expect(typeof inputNumbers.type).toBe('number');
  });

  test('Testa se existe um botão para adicionar a filtragem', () => {
    const filterButton = screen.getByTestId('button-filter');

    expect(filterButton).toBeInTheDocument();
  });

  test('Test se utiliza o botão de filtrar sem alterar os valores iniciais dos inputs de filtro', () => {
    const filterButton = screen.getByTestId('button-filter');
    const inputNumbers = screen.getByTestId('value-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');

    userEvent.type(inputNumbers, 0);
    comparisonFilter.innerText = /maior que/i;

    userEvent.click(filterButton);

    const planetAlderaan = screen.getByRole('cell', { name: /alderaan/i });
    const planetBespin = screen.getByRole('cell', { name: /bespin/i });
    const planetCoruscant = screen.getByRole('cell', { name: /coruscant/i });
    const planetEndor = screen.getByRole('cell', { name: /endor/i });
    const planetKamino = screen.getByRole('cell', { name: /kamino/i });
    const planetNaboo = screen.getByRole('cell', { name: /Naboo/i });
    const planetTatooine = screen.getByRole('cell', { name: /Tatooine/i });
    const planetYavinIV = screen.getByRole('cell', { name: /Yavin IV/i })

    expect(planetAlderaan).toBeInTheDocument();
    expect(planetBespin).toBeInTheDocument();
    expect(planetCoruscant).toBeInTheDocument();
    expect(planetEndor).toBeInTheDocument();
    expect(planetKamino).toBeInTheDocument();
    expect(planetNaboo).toBeInTheDocument();
    expect(planetTatooine).toBeInTheDocument();
    expect(planetYavinIV).toBeInTheDocument();
  });
});
