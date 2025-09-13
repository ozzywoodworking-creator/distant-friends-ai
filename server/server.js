import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to SQLite
const dbPromise = open({
  filename: "./distantfriends.db",
  driver: sqlite3.Database,
});

app.get("/", (req, res) => {
  res.send("🌍 Distant Friends AI backend is live 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
