const router = require('express').Router();
const { getProfileById, editProfile, getProjectsByUserId, getInstitutions } = require("../../../controllers/UserProfile/UserProfileController");

router.get("/:id", getProfileById);
router.patch("/edit", editProfile);
router.get("/projects/:id", getProjectsByUserId);
router.get("/edit/institutions", getInstitutions);


module.exports = router;