const router = require("express").Router();

const {
  getQuestionCategory,
  getQuestions,
  addQuestion,
  deleteQuestion,
  editQuestion,
  likeQuestion,
  getPopularQuestions,
} = require("../../../controllers/Forum/QuestionController");
const {
  getAnswers,
  addAnswer,
  deleteAnswer,
  editAnswer,
  likeAnswer,
  getPopularAnswers,
} = require("../../../controllers/Forum/AnswerController");
const {
  getForumUsers,
  getFreqUsers,
} = require("../../../controllers/Forum/ForumUsersController");
const { valid_jwt_needed } = require("../../middleware/authorization");

router.get("/questioncategory", getQuestionCategory);
router.get("/questions", getQuestions);
router.get("/popularquestions", getPopularQuestions);
router.post("/addquestion", addQuestion);
router.post("/addanswer", addAnswer);
router.patch("/deletequestion", deleteQuestion);
router.patch("/deleteanswer", deleteAnswer);
router.patch("/editquestion", editQuestion);
router.patch("/editanswer", editAnswer);
router.get("/answers", getAnswers);
router.get("/popularanswers", getPopularAnswers);
router.get("/users", getForumUsers);
router.get("/frequsers", getFreqUsers);
router.post("/likequestion", likeQuestion);
router.post("/likeanswer", likeAnswer);

module.exports = router;
