const Referral = require("../models/referral");
const asyncHandler = require("express-async-handler");

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, phone, orderNumber } = req.body;

  console.log({
    fullname,
    email,
    phone,
    orderNumber,
  });

  // Validate required fields
  if (!fullname || !email || !phone || !orderNumber) {
    res.status(400);
    throw new Error("Please enter all required fields");
  }

  // Check if user already exists by email or order number
  const existingUser = await Referral.findOne({
    $or: [{ email }, { orderNumber }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      res.status(400);
      throw new Error("Email already exists");
    } else {
      res.status(400);
      throw new Error("Order number already exists");
    }
  }

  // Create a new user
  const newUser = await Referral.create({
    fullname,
    email,
    phone,
    orderNumber,
  });

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      orderNumber: newUser.orderNumber,
      createdAt: newUser.createdAt,
    },
  });
});
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email ,  } = req.body;

//   if (!name || !email) {
//     res.status(400);
//     throw new Error("Please enter all required fields");
//   }

//   // Check if user already exists
//   const existingUser = await Referral.findOne({ email });

//   if (existingUser) {
//     res.status(400);
//     throw new Error("Email already exists");
//   }

//   // Create a new user
//   const newUser = await Referral.create({
//     name,
//     email,
//   });

//   res.status(201).json({ msg: "user created successfully", newUser });
// });

// Get all elections
const getReferrals = asyncHandler(async (req, res) => {
  const referrals = await Referral.find();
  res.status(200).json(referrals);
});

module.exports = {
  registerUser,
  getReferrals,
};
