module.exports = (filter) => {
  const {
    'column-names': columns,
    'first-value': firstValue,
    'second-value': secondValue,
    'logic-op': logicOperator,
    negationSwitch: negation,
  } = filter;
  return `${logicOperator ? logicOperator : ''} ${
    negation ? negation : ''
  } ${columns} BETWEEN '${firstValue}' AND '${secondValue}' `;
};
