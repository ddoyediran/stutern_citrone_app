const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser"); 
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const tokenRoute = require("./routes/passwordReset");
const settingsRoute = require("./routes/settingsRoute")
const usersRoute = require("./routes/usersRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use("/api/v1/users", authRoutes);
app.use("/api/v1/users", tokenRoute);
app.use("/api/v1/users", settingsRoute);
app.use("/api/v1/users", usersRoute);


const PORT = process.env.PORT || 3000;

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
