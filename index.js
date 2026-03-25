const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home route (just to check server)
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// POST route to receive phone number
app.post("/submit", (req, res) => {
  const { phone } = req.body;

  // Check if phone exists
  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  // Print to console (you will see this in Render logs)
  console.log("New Phone Number Received:", phone);

  // Always respond (even if frontend ignores it)
  res.status(200).json({ success: true });
});

// Start server
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
