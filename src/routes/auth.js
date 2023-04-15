const router = require("express").Router();
const { login, logout, registerUser, currentUser } = require("../controllers/auth");
const { isTokenValid } = require("../utils/jwt");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/current", isTokenValid, currentUser);
router.get("/logout", logout);

module.exports = router;
