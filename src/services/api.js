export default async function fetchPlanets() {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(URL);
  const json = await response.json();

  return json;
}
