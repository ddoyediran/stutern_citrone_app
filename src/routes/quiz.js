const express = require("express");
const {isTokenValid }= require("../utils/jwt")
const router = express.Router();

const { 
    createQuiz, 
    getAllQuiz, 
    submitQuiz, 
    getQuiz
} = require("../controllers/quizController")

router.post("/createQuiz/:moduleId", isTokenValid, createQuiz);
router.get("/quiz/:quizId", isTokenValid, getQuiz);
router.get("/quiz/questions", isTokenValid, getAllQuiz);
router.post("/quiz/submitQuiz", isTokenValid, submitQuiz);

module.exports = router;