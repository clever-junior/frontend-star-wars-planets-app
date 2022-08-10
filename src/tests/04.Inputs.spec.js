import React from 'react';
import { render, screen, act, getAllByTestId } from '@testing-library/react';
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

  it('', () => {
    const filterButton = screen.getByTestId('button-filter');

    userEvent.click(filterButton);

    const filter = screen.getByTestId('filter');

    expect(filter).toBeInTheDocument();
  });

  it('', () => {
    const filterButton = screen.getByTestId('button-filter');

    userEvent.click(filterButton);

    const deleteBtn = screen.getByRole('button', { name: /x/i });

    expect(deleteBtn).toBeInTheDocument();

    userEvent.click(deleteBtn);

    expect(deleteBtn).not.toBeInTheDocument();
  });

  it('', () => {
    const filterButton = screen.getByTestId('button-filter');

    userEvent.click(filterButton);
    userEvent.click(filterButton);
    userEvent.click(filterButton);

    const removeAllBtn = screen.getByTestId('button-remove-filters');

    expect(removeAllBtn.length).toBe(3);

    userEvent.click(removeAllBtn);

    const filters = getAllByTestId('filter');

    expect(filters).not.toBeInTheDocument();
  });
});
