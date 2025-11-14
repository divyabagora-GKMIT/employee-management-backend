const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user.route.js")

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api",userRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(` App is running on port ${port}`);
});