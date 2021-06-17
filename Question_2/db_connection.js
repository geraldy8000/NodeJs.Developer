const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'freedb.tech',
  user: 'freedbtech_geraldy',
  password: 'dbpassword',
  database: 'freedbtech_apiRequest'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});