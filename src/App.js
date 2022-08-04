import React from 'react';
import Inputs from './components/Inputs';
import Table from './components/Table';
import Provider from './store/provider';

function App() {
  return (
    <Provider>
      <Inputs />
      <Table />
    </Provider>
  );
}

export default App;
