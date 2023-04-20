const Course = require("../models/courses");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");


/** This is the implementation for getting all courses  */
//@route GET method - /api/v1/users/courses
const getAllCourses = async (req, res) => {
    res.json({ message: "this is the get all courses route" })
};

/** This is the implementation for getting a single course */
//@route GET method - /api/v1/users/course/:id
const getCourse = async (req, res) => {
    res.json({ message: "this is the get a single course route" })
};

/** This is the implementation for creating a course */
//@route POST method - /api/v1/users/course/create
const createCourse = async (req, res) => {
    res.json({ message: "this is the create a course route" })
};

/** This is the implementation for updating a course */
//@route PUT method - /api/v1/users/course/update/:id
const updateCourse = async (req, res) => {
    res.json({ message: "this is the update course route" })
};


module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse
}