const router = require("express").Router();
const {
    getAllPostByTrack,
    getSinglePost,
    createPost,
    deletePost
} = require("../controllers/postControllers");
const { isTokenValid } = require("../utils/jwt");


router.get("/posts", isTokenValid, getAllPostByTrack);
router.get("/post/:id", getSinglePost);
router.post("/post/create", isTokenValid, createPost);
router.delete("/post/:id", isTokenValid, deletePost);

module.exports = router;