const router = require("express").Router();
const { login, logout, registerUser } = require("../controllers/auth");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
