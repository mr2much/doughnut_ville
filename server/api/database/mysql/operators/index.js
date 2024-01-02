const between = require('./between');
const equalTo = require('./equalto');
const greaterThan = require('./greaterthan');
const greaterThanOrEqualTo = require('./greaterthanorequalto');
const inOp = require('./in');
const lessThan = require('./lessthan');
const lessThanOrEqualTo = require('./lessthanorequalto');
const like = require('./like');
const notEqualTo = require('./notequalto');

const commands = {
  between,
  equalTo,
  greaterThan,
  greaterThanOrEqualTo,
  in: inOp,
  lessThan,
  lessThanOrEqualTo,
  like,
  notEqualTo,
};

module.exports = (params) => {
  let query = `SELECT * FROM doughnut_ratings WHERE`;

  params.forEach((filter) => {
    const {
      'column-names': columnNames,
      'comp-op': compOp,
      'search-term': searchTerm,
      'logic-op': logicOp,
    } = filter;

    query += commands[compOp](filter);
  });

  return query;
};
