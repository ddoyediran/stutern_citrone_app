const express = require("express");
const {
  getAllCourses,
  getStudentCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/coursesControllers");
const { isTokenValid } = require("../utils/jwt");
const router = express.Router();

router.get("/courses", isTokenValid, getAllCourses);
router.get("/studentCourses", isTokenValid, getStudentCourses);
router.get("/courses/:id", isTokenValid, getCourse);
router.post("/courses/create", isTokenValid, createCourse);
router.put("/courses/update/:id", isTokenValid, updateCourse);
router.delete("/courses/delete/:courseId", isTokenValid, deleteCourse);
module.exports = router;
