module.exports = (filter) => {
  const {
    'column-names': columns,
    'search-term': term,
    'logic-op': logicOperator,
  } = filter;

  return `${logicOperator ? logicOperator : ''} ${columns} < '${term}' `;
};
