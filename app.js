const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(` App is running on port ${port}`);
});