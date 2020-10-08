const express = require('express');
const formidableMiddleware = require('express-formidable');
const { connectDatabase } = require('./models/connection');

const app = express();
const { SERVER_PORT } = require('./config');
const noticeRouter = require('./routes/noticeRouter');

app.use(express.json());
app.use(formidableMiddleware());
app.use(express.urlencoded({ extended: false }));

connectDatabase();

app.use('/notice', noticeRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Start the server at ${SERVER_PORT}`);
});