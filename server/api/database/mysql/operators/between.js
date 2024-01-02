module.exports = (filter) => {
  const {
    'column-names': columns,
    'first-value': firstValue,
    'second-value': secondValue,
    'logic-op': logicOperator,
  } = filter;
  return `${
    logicOperator ? logicOperator : ''
  } ${columns} BETWEEN '${firstValue}' AND '${secondValue}' `;
};
