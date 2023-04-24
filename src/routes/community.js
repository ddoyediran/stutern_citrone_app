const router = require("express").Router();
const { model } = require("mongoose");
const { getAllUsers } = require("../controllers/community");
const { isTokenValid } = require("../utils/jwt");

router.get("/community", isTokenValid, getAllUsers);

module.exports = router;
