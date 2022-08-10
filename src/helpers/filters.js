const operator = {
  biggerThan: 'maior que',
  lessThan: 'menor que',
  equalTo: 'igual a',
};

export function applyNameFilter(data, name) {
  const newData = data.filter((planet) => planet.name.includes(name));

  return newData;
}

export function applyNumericFilter(data, numericValue) {
  let newData = data;

  numericValue.forEach((element) => {
    switch (element.comparison) {
    case operator.biggerThan: {
      const result = newData
        .filter((planet) => +planet[element.column] > element.value);
      newData = result;
      return newData;
    }
    case operator.lessThan: {
      const result = newData
        .filter((planet) => +planet[element.column] < element.value);
      newData = result;
      return newData;
    }
    case operator.equalTo: {
      const result = newData
        .filter((planet) => planet[element.column] === element.value);
      newData = result;
      return newData;
    }
    default: break;
    }
  });
  return newData;
}

export function applySortOrder(data, { sort, column }) {
  let newData = data.filter((item) => item[column] !== 'unknown');
  if (sort === 'ASC') {
    newData = newData
      .sort((a, b) => parseInt(a[column], 10) - parseInt(b[column], 10));
  }
  if (sort === 'DESC') {
    newData = newData
      .sort((a, b) => parseInt(b[column], 10) - parseInt(a[column], 10));
  }

  return newData;
}
