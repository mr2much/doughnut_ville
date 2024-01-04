const between = require('./between');
const equalTo = require('./equalto');
const greaterThan = require('./greaterthan');
const greaterThanOrEqualTo = require('./greaterthanorequalto');
const inOp = require('./in');
const lessThan = require('./lessthan');
const lessThanOrEqualTo = require('./lessthanorequalto');
const like = require('./like');
const notEqualTo = require('./notequalto');

const operators = {
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
    const { 'comp-op': compOp } = filter;

    query += operators[compOp](filter);
  });

  return query;
};
