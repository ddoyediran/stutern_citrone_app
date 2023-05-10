const router = require("express").Router();
const { 
    allReplies, 
    createReply, 
    deleteReply 
} = require("../controllers/replyController");
const { isTokenValid } = require("../utils/jwt");


router.get("/replies", isTokenValid, allReplies );
router.post("/reply/create", isTokenValid, createReply );
router.delete("/reply/delete/:id", isTokenValid, deleteReply );

module.exports = router;