const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// Create a new admin
const createAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check if the admin already exists
  const adminExists = await Admin.findOne({ username });
  if (adminExists) {
    res.status(400);
    throw new Error("Username already exists");
  }
  // Create new admin
  const admin = new Admin({ name, password, email });
  await admin.save();

  res.status(201).json({
    message: "Admin created successfully",
    admin: {
      name: admin.username,
      role: admin.role,
    },
  });
});

// Login admin and generate JWT token
const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check if admin exists
  const admin = await Admin.findOne({ username });
  if (!admin) {
    res.status(400);
    throw new Error("Invalid user");
  }

  // Compare password
  const isMatch = await admin.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  res.json({
    message: "Login successful",
    admin: {
      name: admin.username,
    },
  });
});

module.exports = { createAdmin, loginAdmin };
