const Module = require("../models/modules.js");
const Question = require("../models/quiz.js");
const Quiz = require("../models/quiz.js")
const { StatusCodes } = require("http-status-codes");



/** This is the implementation getting all questions  */
//@route GET method - /api/v1/users/quiz/questions
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

/** This is the implementation getting a single quiz */
//@route GET method - /api/v1/users/quiz/:quizId
const getQuiz = async (req, res) => {
  try {
    //checking to see if a quiz exists
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "Quiz not found"
      })
    };

    const quizQuestions = quiz.questionLists;
    const quizAnswers = quiz.answers;

    //Creating an object to hold the questions, options and selected answers
    const questionWithOptions = quizQuestions.map((question) => {
      //Get the index of the answer for this question
      const answerIndex = quizAnswers.findIndex(
        (answer) => answer.questionNumber === question.questionNumber
      );
      // Set the selected answer to null by default
      let selectedOption = null;

      //if an answer has already been submitted for this question, set the selected answer to that answer
      if (answerIndex !== -1) {
        selectedOption = quizAnswers[answerIndex].answers;
      };

      return {
        question: question.questionNumber,
        question: question.question,
        options: question.options,
        selectedOption: selectedOption
      };
    })

    res.status(StatusCodes.OK).json({ quizQuestions: questionWithOptions })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "No quiz found"
    });
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
};

/** This is the implementation for submitting answers and getting scored  */
//@route POST method - /api/v1/users/quiz/submitQuiz
const submitQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const studentId = req.user.userId;
    const attemptedQuestions = req.body.attemptedQuestion;

    const quiz = await Quiz.findById(quizId);

    const answers = quiz.answers;

    if (!quiz) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Quiz not found"
      });
    };
     
    const questionsList = quiz.questionLists;
    const totalQuestion = questionsList.length;

    let correctAnswers = 0;

    for ( let i = 0; i < totalQuestion; i++) {
      //checking all the questions in the array of question list in the database
      const questListNumber = questionLists[i].questionNumber;

      //Checking all the questions number in the array of answers in the database
      const correctAnswer = answers.find((a) => a.questionNumber === questListNumber)?.answer;

      //Checking user selected answer corresponding to each question
      const attemptedAnswer = attemptedQuestions.find((a) => a.questionNumber === questListNumber)?.answer;

      if(correctAnswer === attemptedAnswer) {
        correctAnswer++;
      }
    };

    const score = totalQuestion > 0 ? Math.round((correctAnswers / totalQuestion) * 100) : 0;

    //updating the score in the score model
    const scoreObj = await score.create({
      studentId,
      quizId,
      score
    });

    res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Quiz successfully submitted",
      score: scoreObj
    })

  } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }

};

module.exports = {
  createQuiz,
  getQuiz,
  getAllQuiz,
  submitQuiz
};