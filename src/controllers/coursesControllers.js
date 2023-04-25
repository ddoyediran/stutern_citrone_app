const Course = require("../models/courses");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

/** This is the implementation for getting all courses  */
//@route GET method - /api/v1/users/courses
const getAllCourses = async (req, res) => {
  res.json({ message: "this is the get all courses route" });
};

/** This is the implementation for getting a single course */
//@route GET method - /api/v1/users/course/:id
const getCourse = async (req, res) => {
  try {
    const user = req.user;

    const course = await Course.findById(req.params.id);

    const student = await User.findById(user.userId);

    //const allStudents = await User.find();

    //console.log(allStudents);

    if (!course) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json("Course currently not available!");
    }

    if (course.courseName !== student.track) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json("Update your track on your student profile");
    }

    res.status(StatusCodes.OK).json({ course });
  } catch (err) {
    res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

/** This is the implementation for creating a course */
//@route POST method - /api/v1/users/course/create
const createCourse = async (req, res) => {
  try {
    const { courseName, modules, level, users } = req.body;
    // validate the input field
    if (!courseName || !level) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("All fields are mandatory!");
    }

    const createdCourse = await Course.create({
      courseName,
      modules,
      level,
      studentsEnrolled,
    });

    res.status(StatusCodes.CREATED).json({ course: createdCourse });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
  }
};

/** This is the implementation for updating a course */
//@route PUT method - /api/v1/users/course/update/:id
const updateCourse = async (req, res) => {
  res.json({ message: "this is the update course route" });
};

module.exports = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
};
