import React, { useContext } from 'react';
import AppContext from '../store/context';

export default function Filters() {
  const { filters: { filterByName: { setName } } } = useContext(AppContext);

  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ ({ target: { value } }) => setName(value) }
    />
  );
}
