const Course = require("../models/courses");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");


/** This is the implementation for getting all courses  */
//@route GET method - /api/v1/users/courses

const getAllCourses = async (req, res, next) => {
    try {
        //checking all courses
        const courses = await Course.find();
        if(courses.length === 0) {
            res.status(StatusCodes.NOT_FOUND).json("No Course available");
        }
        res
        .status(StatusCodes.OK)
        .json(courses);

    } catch (error) {
        next(error);
    }
};
/** This is the implementation for getting all courses tagged to a student  */
//@route GET method - /api/v1/users/studentCourses
const getStudentCourses = async (req, res, next) => {
    try {
        const user = req.user;

        const signedInUser = await User.findById(user.userId);

        const courses = await Course.find({ track: signedInUser.track }).populate("modules");

        if (!courses || courses.length === 0) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "No course available or You need to update track in profile settings!" });
        }

        res.status(StatusCodes.OK).json({ courses: courses });
    } catch (err) {
        next(err.message);
    }
};

/** This is the implementation for getting a single course */
//@route GET method - /api/v1/users/courses/:id
const getCourse = async (req, res) => {
    try {
        const user = req.user;

        const course = await Course.findById(req.params.id);

        const student = await User.findById(user.userId);


        if (!course) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Course currently not available!" });
        }

        if (course.track !== student.track) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Update your track on your student profile" });
        }

        //await course.populate("studentsEnrolled", { firstName: 1, _id: 0 });
        await course.populate("modules");

        res.status(StatusCodes.OK).json({ course });
    } catch (err) {
        res
            .status(StatusCodes.NOT_FOUND)
            .json({ message: err.message, stack: err.stack });
    }
};

/** This is the implementation for creating a course */
//@route POST method - /api/v1/users/courses/create

const createCourse = async (req, res) => {
    try {
        const { track, modules, level, studentsEnrolled } = req.body;
        // validate the input field
        if (!track || !level) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: "All fields are mandatory!" });
        }

        // find all the users with the same track
        // Note that the track field is used to filter the enrolled students.

        const enrolledStudents = await User.find({ track });

        // extract the _id field from each of the user documents
        const studentIds = enrolledStudents.map((student) => student._id);

        const course = await Course.findOne({track, level});
        if(course) {
            res
            .status(StatusCodes.NOT_FOUND)
            .json("A Course with this Track and level already exists");
        }
        const createdCourse = await Course.create({
            track,
            modules,
            level,
            studentsEnrolled: studentIds,
        });

        res.status(StatusCodes.CREATED).json({ course: createdCourse });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
};


/** This is the implementation for updating a course */
//@route PUT method - /api/v1/users/courses/update/:id
const updateCourse = async (req, res) => {
    res.json({ message: "this is the update course route" });
};


/** This is the implementation for updating a course */
//@route DELETE method - /api/v1/users/course/delele/:courseId
const deleteCourse = async (req, res, next) => {
    try {
        //checking to see if a course exists
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            res
                .status(StatusCodes.NOT_FOUND)
                .json("Course not found");
        }

        await Course.deleteOne();
        res.status(StatusCodes.OK).json({ message: "Course successfully deleted" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCourses,
    getStudentCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
};