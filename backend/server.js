const express = require("express");
const { Pool } = require("pg");
const redis = require("redis");

const app = express();
const PORT = 5000;

/* ---------------- PostgreSQL ---------------- */
const pool = new Pool({
  host: process.env.DB_HOST, 
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432,
});
/* ---------------- Redis ---------------- */
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || process.env.REDIS_HOST}:6379`,
});

redisClient.connect().catch(console.error);

/* ---------------- Health Route ---------------- */
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* ---------------- API Route ---------------- */
app.get("/api/data", async (req, res) => {
  try {
    // Check cache first
    const cachedData = await redisClient.get("data");

    if (cachedData) {
      return res.json({
        source: "cache",
        data: JSON.parse(cachedData),
      });
    }

    // If not in cache, fetch from DB
    const result = await pool.query("SELECT NOW()");

    // Store in Redis
    await redisClient.set("data", JSON.stringify(result.rows));

    res.json({
      source: "database",
      data: result.rows,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});