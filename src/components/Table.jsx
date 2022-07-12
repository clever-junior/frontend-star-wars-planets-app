import React, { useContext } from 'react';
import AppContext from '../store/context';

export default function Table() {
  const { table: { headers }, data } = useContext(AppContext);

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
        {data.length && data
          .map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((value, i) => <td key={ i }>{value}</td>)}
            </tr>))}
      </tbody>
    </table>
  );
}
