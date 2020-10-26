const express = require('express');
const logger = require('morgan');
const app = express();
const cors = require('cors');
const { connectDatabase } = require('./models/connection');
const { SERVER_PORT } = require('./config');
const router = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

connectDatabase();

app.use('/', router);

app.listen(SERVER_PORT, () => {
  console.log(`Start the server at ${SERVER_PORT}`);
});
