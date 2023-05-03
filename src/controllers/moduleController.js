const Module = require("../models/modules");
const Course = require("../models/courses");
const { StatusCodes } = require("http-status-codes");

/** This is the implementation for getting all modules  */
//@route GET method - /api/v1/users/modules
const getAllModules = async (req, res, next) => {
  try {
    const modules = await Module.find();

    if (modules.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Module not found!" });
    }

    res.status(StatusCodes.OK).json({ message: modules });
  } catch (err) {
    next(err.message);
  }
};

const getModule = async (req, res, next) => {

};

/** This is the implementation for create a module  */
//@route POST method - /api/v1/users/modules/:courseId
const createModule = async (req, res, next) => {
  try {
    //checking to see if a particular courses exists
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Course does not exist!" });
    }

    //validating input fields 
    const { name, title, modulePicture, lessons, liveClassURL, recordedClassURL } = req.body;
    if (!name || !title || !lessons || !liveClassURL) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields mandatory!" });
    }
    const moduleExist = await Module.findOne({
      "courseModule.title": title,
      "course": course._id,
    });
    if (moduleExist) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Module already created!" });
    }
    const createdModule = await Module.create({
      courseModule: { name, title, modulePicture },
      lessons: [{
        name: lessons[0].lessonName,
        title: lessons[0].lessonTitle,
        description: lessons[0].description,
        fileURL: lessons[0].fileURL,
      }],
      liveClassURL,
      recordedClassURL,
      course: course._id,
    });
    course.modules.addToSet(createdModule._id);
    await course.save();
    res.status(StatusCodes.CREATED).json({ module: createdModule });
  } catch (err) {
    next(err.message);
  }
};

module.exports = {
  getAllModules,
  getModule,
  createModule,
};
