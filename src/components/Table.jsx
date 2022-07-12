import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../store/context';

export default function Table() {
  const [planets, setPlanets] = useState([]);

  const {
    data,
    table: { headers },
    filters: { filterByName: { name } },
  } = useContext(AppContext);

  useEffect(() => {
    function filterByName() {
      if (data.length !== 0) {
        const result = data
          .filter((planet) => (
            planet.name.includes(name)));
        setPlanets(result);
      }
    }
    filterByName();
  }, [name, data, setPlanets]);

  return (
    <table style={ { border: '2px solid black' } }>
      <thead>
        <tr>
          {
            headers.map((title, index) => (
              <th key={ `title=${index}` }>
                {title}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {planets.length && planets
          .map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((value, i) => <td key={ i }>{value}</td>)}
            </tr>))}
      </tbody>
    </table>
  );
}
