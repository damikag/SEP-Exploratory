const router = require("express").Router();
const {
  indexAction,
  leaveRoomAction,
  joinRoomAction,
  unwantedLinkRedirectAction,
} = require("../controllers/roomController");

router.get("/", unwantedLinkRedirectAction);

router.get("/:room&:token&:user_id", indexAction);

router.post("/leave", leaveRoomAction);

router.post("/join", joinRoomAction);

module.exports = router;
