const express = require("express");
const path = require('path');

const app = express();

app.use((req, res, next) => {
  const { method, path } = req;
  console.log(
    `New request to: ${method} ${path} at ${new Date().toISOString()}`
  );
  next();
});


const port = process.env.PORT || 8080;

app.listen(port, () => {
 console.log(`Server is up on port ${port}.`);
});