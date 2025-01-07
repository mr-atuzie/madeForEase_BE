const express = require("express");
const router = express.Router();
const { registerUser, getReferrals } = require("../controllers/referral");

// Public routes
router.post("/register", registerUser);
router.get("/", getReferrals);

module.exports = router;
