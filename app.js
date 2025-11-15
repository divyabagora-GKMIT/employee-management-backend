const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoute = require("./routes/user.route.js");
const departmentRoute = require("./routes/department.route.js")
const projectRoute = require("./routes/project.route.js")

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api",userRoute);
app.use("/api/dept",departmentRoute);
app.use("/api/project",projectRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(` App is running on port ${port}`);
});