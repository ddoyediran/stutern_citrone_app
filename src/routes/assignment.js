const router = require("express").Router();
const {
  submitAssignment,
  deleteAssignment,
} = require("../controllers/assignment");
const { isTokenValid } = require("../utils/jwt");

router.post("/submit", isTokenValid, submitAssignment);
router.delete("/delete/:id", isTokenValid, deleteAssignment);

module.exports = router;
