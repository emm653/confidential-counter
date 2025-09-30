// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Relayer } = require("@zama-fhe/relayer-sdk");

const app = express();
const PORT = 5000;


const RELAYER_URL = "https://relayer.testnet.zama.cloud";
const relayer = new Relayer(RELAYER_URL);

app.use(cors());
app.use(bodyParser.json());

// Encrypt endpoint
app.post("/encrypt", async (req, res) => {
  const { value, type } = req.body;
  if (!value || !type) return res.status(400).json({ error: "Missing value or type" });

  try {
    const encrypted = await relayer.encrypt(value, type);
    res.json({ encrypted });
  } catch (err) {
    console.error("Encrypt error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Relayer backend running on http://localhost:${PORT}`);
});
