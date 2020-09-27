const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/ping',(req,res) => {
  res.send('pong');
});

app.listen(port, () => {
  console.log("Server is starting at 3000 port.");
});
