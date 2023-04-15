const express = require("express");
const { 
    getAllUsers,
    deleteUser,
    getUser 
} = require("../controllers/usersControllers");
const { isTokenValid } = require("../utils/jwt");
const router = express.Router();

//router.use(isTokenValid);


router.get("/", getAllUsers);
router.get("/user/:id", getUser)
router.delete("/delete/:id", deleteUser)

module.exports = router;