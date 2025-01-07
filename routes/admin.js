const express = require("express");
const { createAdmin, loginAdmin } = require("../controllers/admin");
const router = express.Router();

// Route to create a new admin
router.post("/create", createAdmin);

// Route to log in an admin
router.post("/login", loginAdmin);

module.exports = router;
