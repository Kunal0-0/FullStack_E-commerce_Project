const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/send", async (req, res) => {
  const { mobile_number } = req.body;

  try {
    const user = await User.findOne({ mobile_number });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User exists" });
  } catch (error) {
    console.error("Check user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});