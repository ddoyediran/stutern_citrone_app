const router = require("express").Router();
const { submitAssignment } = require("../controllers/assignment");
const { isTokenValid } = require("../utils/jwt");

router.post("/submit", isTokenValid, submitAssignment);

module.exports = router;
