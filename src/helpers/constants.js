export const headers = [
  'Name',
  'Rotation Period',
  'Orbital Period',
  'Diameter',
  'Climate',
  'Gravity',
  'Terrain',
  'Surface Water',
  'Population',
  'Films',
  'Created',
  'Edited',
  'URL',
];

export const columns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export const operators = [
  'maior que',
  'menor que',
  'igual a',
];

export const initialFilterValuesState = {
  name: '',
  column: 'population',
  comparison: 'maior que',
  value: 0,
};
