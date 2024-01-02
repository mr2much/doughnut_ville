module.exports = (filter) => {
  const {
    'column-names': columns,
    'search-term': terms,
    'logic-op': logicOperator,
  } = filter;

  //  Splits the strings by commas, then joins them together into a single string,
  // but with each item surrounded by single quotes
  return `${logicOperator ? logicOperator : ''} ${columns} IN (${terms
    .split(',')
    .map((value) => `'${value.trim()}'`)}) `;
};
