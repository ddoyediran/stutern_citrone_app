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

/** This is the implementation to get a module  */
//@route GET method - /api/v1/users/modules/:moduleId 
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

    //creating the lesson object
    const lessonObjects = lessons.map(lesson => ({
      name: lesson.name,
      title: lesson.title,
      description: lesson.description,
      fileURl: lesson.fileURL
    }))

    const moduleData = {
      courseModule: { name, title, modulePicture },
      lessons: lessonObjects,
      liveClassURL,
      recordedClassURL,
      course: course._id
    }
    const createdModule = await Module.create(moduleData);
    
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
