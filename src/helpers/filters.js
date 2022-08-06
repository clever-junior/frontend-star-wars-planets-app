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
  console.log(numericValue);
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
  console.log(newData);
  return newData;
}
