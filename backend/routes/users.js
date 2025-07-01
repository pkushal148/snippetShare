const express = require("express");

const router = express.Router();

// Example user route (expand as needed)
router.get("/", (req, res) => {
  res.json({ message: "User route works!" });
});

module.exports = router;
