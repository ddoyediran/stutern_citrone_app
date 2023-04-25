const express = require("express");
const {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse
} = require("../controllers/coursesControllers");
const { isTokenValid } = require("../utils/jwt");
const router = express.Router();


router.get("/courses", getAllCourses)
router.get("/course/:id", getCourse)
router.post("/course/create", createCourse)
router.put("/course/update/:id", updateCourse)


module.exports = router;