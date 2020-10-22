const express = require('express');
const { connectDatabase } = require('./models/connection');
const cors = require('cors');
const app = express();
const { SERVER_PORT } = require('./config');  
const router = require('./routes');

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(SERVER_PORT, () => {
  console.log(`Server is starting at ${SERVER_PORT} port.`);
});

//test commit - 1014/dupang
// test commi - origin/test1014

