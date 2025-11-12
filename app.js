import express from "express";
import dotenv from "dotenv";
import db from "./models/index.js"; // ✅ import Sequelize setup (your models & connection)

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// ✅ Sync Sequelize models (creates tables if not exist)
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    await db.sequelize.sync({ alter: true });
    console.log("✅ All tables created or updated successfully!");
  } catch (err) {
    console.error("❌ Error connecting or syncing database:", err);
  }
})();

// Sample route to test your Express server
app.get("/", (req, res) => {
  res.send("🚀 Server and Database are running!");
});

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`✅ App is running on port ${port}`);
});
