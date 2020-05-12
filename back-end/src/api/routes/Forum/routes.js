const router = require('express').Router();

const { getQuestionCategory, getQuestions, addQuestion } = require("../../../controllers/Forum/QuestionController");
const { getAnswers } = require("../../../controllers/Forum/AnswerController");

router.get("/questioncategory", getQuestionCategory);
router.get("/questions", getQuestions);
router.post("/addquestion", addQuestion);

router.get("/answers", getAnswers);


module.exports = router;