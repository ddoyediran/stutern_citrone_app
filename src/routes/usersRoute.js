const express = require("express");
const { getAllUsers } = require("../controllers/usersControllers");
const { isTokenValid } = require("../utils/jwt");
const router = express.Router();

//router.use(isTokenValid);


router.get("/", getAllUsers);

module.exports = router;