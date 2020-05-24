const router = require('express').Router();

const { getQuestionCategory, getQuestions, addQuestion, deleteQuestion, editQuestion } = require("../../../controllers/Forum/QuestionController");
const { getAnswers,addAnswer, deleteAnswer, editAnswer} = require("../../../controllers/Forum/AnswerController");
const {valid_jwt_needed} =  require('../../middleware/authorization');

router.get("/questioncategory", getQuestionCategory);
router.get("/questions", getQuestions);
router.post("/addquestion", addQuestion);
router.post("/addanswer", addAnswer);
router.patch("/deletequestion",deleteQuestion);
router.patch("/deleteanswer",deleteAnswer);
router.patch("/editquestion",editQuestion);
router.patch("/editanswer",editAnswer);
router.get("/answers", getAnswers);


module.exports = router;