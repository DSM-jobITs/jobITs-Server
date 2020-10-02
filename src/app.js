const express = require('express');
const { connectDatabase } = require('./models/connection');

const app = express();
const { PORT } = require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDatabase();

app.listen(PORT, () => {
  console.log(`Start the server at ${PORT}`);
});