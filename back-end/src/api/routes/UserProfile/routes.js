const router = require('express').Router();
const { getProfileById, editProfile, getProjectsByUserId } = require("../../../controllers/UserProfile/UserProfileController");

router.get("/:id", getProfileById);
router.patch("/edit", editProfile);
router.get("/projects/:id", getProjectsByUserId);


module.exports = router;