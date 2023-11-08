const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Stpctppalpycec@1',
  database: 'doughnut_ville',
});

module.exports = connection;
