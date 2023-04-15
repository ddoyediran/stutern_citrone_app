const router = require("express").Router();
const { submitAssignment } = require("../controllers/assignment");
const { isTokenValid } = require("../utils/jwt");

router.put("/submit", isTokenValid, submitAssignment);

module.exports = router;
