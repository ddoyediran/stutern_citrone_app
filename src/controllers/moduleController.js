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

const getModule = async (req, res, next) => {};

/** This is the implementation for create a module  */
//@route POST method - /api/v1/users/modules/:courseId
const createModule = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res
        .status(StatusCodes)
        .json({ message: "Course does not exist!" });
    }

    const courseModule = {
      name: req.body.name,
      title: req.body.title,
    };

    const lesson = {
      name: req.body.lessonName,
      title: req.body.lessonTitle,
      fileUrl: req.body.fileUrl,
      content: req.body.content,
    };

    const { liveClassUrl, recordedClassUrl } = req.body;

    // const lesson = {};

    // module: {
    //     name: "Your module name",
    //     title: "Your module title"
    //   }

    //const { moduleName, moduleTitle} = req.body

    //console.log("working here");

    // const {
    //   courseModule: { name: moduleName, title, modulePicture },
    //   lesson: { name: lessonName, title: lessonTitle, content, fileUrl },
    //   liveClassUrl,
    //   recordedClassUrl,
    // } = req.body;

    //console.log(err.stack);
    //console.log(req.body);

    if (
      !courseModule.name ||
      !courseModule.title ||
      !lesson.name ||
      !lesson.title ||
      !lesson.content ||
      !lesson.fileUrl ||
      !liveClassUrl
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields mandatory!" });
    }

    //const moduleExist = await Module.exists({ courseModule });
    //const moduleExist = await Module.find(courseModule.name);

    if (moduleExist) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Module already created!" });
    }

    const createdModule = await Module.create({
      courseModule: {
        name: req.body.name,
        title: req.body.title,
        modulePicture: req.body.modulePicture,
      },
      lesson: {
        name: req.body.lessonName,
        title: req.body.lessonTitle,
        content: req.body.content,
        fileUrl: req.body.fileUrl,
      },
      liveClassUrl: req.body.liveClassUrl,
      recordedClassUrl: req.body.recordedClassUrl,
      course: course._id,
    });

    course.modules.addToSet(createdModule._id);

    course.save();

    res.status(StatusCodes.CREATED).json({ module: createdModule });
  } catch (err) {
    console.log(err.stack);
    console.log(err.message);
    next(err.message);
  }
};

module.exports = {
  getAllModules,
  getModule,
  createModule,
};
