const express = require('express');
const logger = require('morgan');
const app = express();
const cors = require('cors');
const formidableMiddleware = require('express-formidable');
const { connectDatabase } = require('./models/connection');
const { SERVER_PORT } = require('./config');
const router = require('./routes');

app.use(express.json());
app.use(formidableMiddleware({ multiples: true }));
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());

connectDatabase();

app.use('/', router);

app.listen(SERVER_PORT, () => {
  console.log(`Start the server at ${SERVER_PORT}`);
});
