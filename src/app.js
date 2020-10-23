const express = require('express');
const formidableMiddleware = require('express-formidable');
const { connectDatabase } = require('./models/connection');

const app = express();
const { SERVER_PORT } = require('./config');
const router = require('./routes');

app.use(cors());
app.use(express.json());
app.use(formidableMiddleware({ multiples: true }));
app.use(express.urlencoded({ extended: false }));

connectDatabase();

app.use('/', router);

app.listen(SERVER_PORT, () => {
  console.log(`Start the server at ${SERVER_PORT}`);
});

//test commit - 1014/dupang
// test commi - origin/test1014
