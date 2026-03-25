const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow all origins + handle preflight
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Handle preflight
app.options("*", cors());

// 🔔 Your Discord Webhook URL
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1486431913538359336/2RIaxmsWLKjsMwDy0eM2IhbvubroVELDltH92LoXaV9jtQdpqsPEI_p2V4fY8T9pl-v4";

// Home route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Form route
app.post("/submit", async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  // ✅ Log to Render
  console.log("New Phone Number Received:", phone);

  // 🔔 Send to Discord
  try {
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: `📞 New Phone Number: ${phone}`
      })
    });
  } catch (error) {
    console.log("Discord Error:", error);
  }

  res.status(200).json({ success: true });
});

// Start server
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
