const express = require('express');
const app = express();
const { SERVER_PORT } = require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(SERVER_PORT, () => {
  console.log(`SERVER is starting at ${SERVER_PORT} port.`);
});