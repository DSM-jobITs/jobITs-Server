const express = require('express');
const { connectDatabase } = require('./models/connection');
const cors = require('cors');
const app = express();
const { SERVER_PORT } = require('./config');
const interviewRouter = require('./routes/interviewRouter');

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/interview', interviewRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Server is starting at ${SERVER_PORT} port.`);
});

// pull request 222test with dupang.
// pull request test with dupang.