const express = require("express");
const dotenv = require("dotenv");

// dotenv config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
