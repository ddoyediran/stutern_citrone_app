const express = require("express");
const {
  getStudentCourses,
  getCourse,
  createCourse,
  updateCourse,
} = require("../controllers/coursesControllers");
const { isTokenValid } = require("../utils/jwt");
const router = express.Router();

router.get("/courses", isTokenValid, getStudentCourses);
router.get("/courses/:id", isTokenValid, getCourse);
router.post("/courses/create", isTokenValid, createCourse);
router.put("/courses/update/:id", updateCourse);

module.exports = router;
