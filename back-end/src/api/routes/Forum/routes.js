const router = require('express').Router();

const { getQuestionCategory, getQuestions, addQuestion, deleteQuestion } = require("../../../controllers/Forum/QuestionController");
const { getAnswers,addAnswer, deleteAnswer} = require("../../../controllers/Forum/AnswerController");

router.get("/questioncategory", getQuestionCategory);
router.get("/questions", getQuestions);
router.post("/addquestion", addQuestion);
router.post("/addanswer", addAnswer);
router.patch("/deletequestion",deleteQuestion);
router.patch("/deleteanswer",deleteAnswer);
router.get("/answers", getAnswers);


module.exports = router;