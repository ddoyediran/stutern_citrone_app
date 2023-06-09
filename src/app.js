const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./db/connect");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const passwordReset = require("./routes/passwordReset");
const settingsRoute = require("./routes/settingsRoute");
const usersRoute = require("./routes/usersRoute");
const assignmentRoute = require("./routes/assignment");
const coursesRoute = require("./routes/courses");
const dashboardRoute = require("./routes/dashboard");
const communityRoute = require("./routes/community");
const moduleRoute = require("./routes/module");
const quizRoute = require("./routes/quiz");
const postRoute  = require("./routes/post");
const replyRoute  = require("./routes/reply");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
//app.use(cookieParser());
app.use("/api/v1/users", authRoutes);
app.use("/api/v1/users", passwordReset);
app.use("/api/v1/users", settingsRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/users/assignments", assignmentRoute);
app.use("/api/v1/users", coursesRoute);
app.use("/api/v1/users", dashboardRoute);
app.use("/api/v1/users", communityRoute);
app.use("/api/v1/users", moduleRoute);
app.use("/api/v1/users", quizRoute);
app.use("/api/v1/users", postRoute);
app.use("/api/v1/users", replyRoute);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    // connect to Mongodb
    const connected = await connectDB(process.env.MONGODB_URI);
    if (connected) {
      console.log(
        "Connected to database:",
        connected.connection.host,
        connected.connection.name
      );
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
