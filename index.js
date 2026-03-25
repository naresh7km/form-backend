const express = require("express");
const cors = require("cors");

const app = express();

// ✅ FIX: Allow all origins + handle preflight
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// IMPORTANT: handle preflight manually
app.options("*", cors());

// Home route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Form route
app.post("/submit", (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  console.log("New Phone Number Received:", phone);

  res.status(200).json({ success: true });
});

// Start server
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
