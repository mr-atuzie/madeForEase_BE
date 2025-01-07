const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// Create a new admin
const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log({ name, email, password });

  // Check if the admin already exists
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }
  // Create new admin
  const admin = new Admin({ name, password, email });
  await admin.save();

  res.status(201).json({
    message: "Admin created successfully",
    admin: {
      name: admin.name,
      role: admin.role,
    },
  });
});

// Login admin and generate JWT token
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if admin exists
  const admin = await Admin.findOne({ email });
  if (!admin) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  // Compare password
  const isMatch = await admin.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",

    admin: {
      name: admin.name,
      email: admin.email,
    },
  });
});

module.exports = { createAdmin, loginAdmin };
