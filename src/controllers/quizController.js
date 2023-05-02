const Module = require("../models/modules.js");
const Question = require("../models/quiz.js");
const Quiz = require("../models/quiz.js")
const { StatusCodes } = require("http-status-codes");



/** This is the implementation getting all questions  */
//@route GET method - /api/v1/users/createQuestions
const getAllQuiz = async (req, res, next) => {
  try {
    const questions = await Question.find();
    if (questions.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json("No questions available")
    };

    res.status(StatusCodes.OK).json(questions);
  } catch (error) {
    next(error.message)
  }
};

/** This is the implementation for creating questions  */
//@route POST method - /api/v1/users/createQuiz/:moduleId

const createQuiz = async (req, res) => {
  try {
    //Checking to see if  a course exists
    const moduleId = await Module.findById({ _id: req.params.moduleId })
    .select('courseModule.name courseModule.title');
    
    if (!moduleId) return res.status(StatusCodes.NOT_FOUND).json({
      status: "Error",
      message: "Module not found"
    })
    
    //destructuring the request body
    const { questionLists, answers } = req.body
    //Validating the input fields
    if (!questionLists || !answers) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "Error",
        message: "You need to provide questions and answers to create a quiz"
      })
    }
    const quizQuestions = questionLists.map((question) => ({
      questionNumber: question.questionNumber,
      question: question.question,
      options: question.options
    }));
    const quizAnswers = answers.map((answer) => ({
      questionNumber: answer.questionNumber,
      answer: answer.answer
    }));
    const quiz = await Quiz.create({
      moduleID: moduleId._id,
      moduleName: moduleId.courseModule.name,
      moduleTitle: moduleId.courseModule.title,
      questionLists: quizQuestions,
      answers: quizAnswers
    });
    res.status(StatusCodes.CREATED).json({ status: "success", message: "Quiz created successfully", quiz })
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json(error.message)

  }
}

module.exports = { createQuiz, getAllQuiz };