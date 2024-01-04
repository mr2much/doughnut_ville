module.exports = (filter) => {
  const {
    'column-names': columns,
    'search-term': term,
    'logic-op': logicOperator,
    negationSwitch: negation,
  } = filter;

  return `${logicOperator ? logicOperator : ''} ${
    negation ? negation : ''
  } ${columns} = '${term}' `;
};
