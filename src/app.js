const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use("/api/v1/users", authRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    // connect to Mongodb
    const connected = await connectDB(process.env.MONGODB_URI);
    if (connected) {
      console.log("Connected to database:",
      connected.connection.host,
      connected.connection.name);
    }

    // start the server here
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err.message);
  }
};

start();
