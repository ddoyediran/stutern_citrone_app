const express = require("express");
const {isTokenValid }= require("../utils/jwt")
const router = express.Router();

const { createQuiz, getAllQuiz } = require("../controllers/quizController")

router.post("/createQuiz/:moduleId", isTokenValid, createQuiz);
router.get("/questions", isTokenValid, getAllQuiz);

module.exports = router;