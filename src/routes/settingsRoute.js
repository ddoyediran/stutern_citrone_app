const express = require("express");
const { profileSetting } = require("../controllers/settingsControllers");
const { isTokenValid } = require("../utils/jwt");
const router = express.Router();

//router.use(isTokenValid);
router.route("/settings/profile/:id").put(isTokenValid, profileSetting);

module.exports = router;