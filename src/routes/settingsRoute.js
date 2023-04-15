const express = require("express");
const { profileSetting } = require("../controllers/settingsControllers");
const { isTokenValid } = require("../utils/jwt");
const router = express.Router();

//router.use(isTokenValid);
router.put("/settings/profile/:id", profileSetting);

module.exports = router;