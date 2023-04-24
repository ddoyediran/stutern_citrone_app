const router = require("express").Router();
const { getUserDetails } = require("../controllers/dashboard");
const { isTokenValid } = require("../utils/jwt");

router.get("/dashboard", isTokenValid, getUserDetails);

module.exports = router;
