const express = require('express');
const app = express();
const port = 3000;

const serverPort = 3000;
app.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get('/', function (req, res) {
  res.send('This is a landing page');
});

app.get('/documentation', function (req, res) {
  res.send('This is the documentation page');
});

app.use(express.json({limit: '25mb'}));

const cors = require('cors');
app.use(cors());

const mysql = require('mysql2/promise');

async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'sql.freedb.tech',
    database: 'freedb_warhammer40k',
    user: 'freedb_wh40k_root',
    password: 'YA!jXze#AR@Chr6',
  });
  await connection.connect();

  console.log(
    `Connection successful with database (identifier=${connection.threadId})`
  );

  return connection;
}

app.get('/units', async (req, res) => {
  console.log('Retrieving UNITS data from database');
  let sql = 'SELECT * FROM units';

  const connection = await getConnection();
  const [results, fields] = await connection.query(sql);
  res.json(results);
  connection.end();
});