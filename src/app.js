const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
      console.log("Connected to database!");
    }

    // start the server
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err.message);
  }
};

start();
