const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enetr yor fullname"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please use a valid email address",
      ],
    },
    phone: { type: String, required: true },
    orderNumber: { type: String, required: true },
  },
  { timestamps: true }
);

const Referral = mongoose.model("Referral", referralSchema);
module.exports = Referral;
