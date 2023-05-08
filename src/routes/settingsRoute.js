const express = require("express");
const { profileSetting, securitySetting } = require("../controllers/settingsControllers");
const { isTokenValid } = require("../utils/jwt");
const router = express.Router();
const upload = require("../utils/multer");

//router.use(isTokenValid);
router
  .route("/settings/profile/:id")
  .put(isTokenValid, upload.single("picture"), profileSetting);

router.route("/settings/security/:id").put( isTokenValid, securitySetting);

module.exports = router;
