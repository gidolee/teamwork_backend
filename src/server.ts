// import app from "./app";
// import config from "./config/config";

// app.listen(config.port, () => {
//   console.log(`Server running on port ${config.port}`);
// });

import app from "./app";
import pool from "../src/config/db";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Force DB connection
    await pool.query("SELECT 1");
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
};

startServer();
