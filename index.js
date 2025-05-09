const dotenv = require("dotenv").config();
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");

const referralRoutes = require("./routes/referral");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(
  cors({
    origin: [
      "https://madeforease.shop",
      "https://madeforease.netlify.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/referrals", referralRoutes);

app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Hello world :)");
});

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}....`.magenta.bold);
});
