const router = require("express").Router();
const {
  submitAssignment,
  deleteAssignment,
  getAllAssignments,
  getOneAssignment,
} = require("../controllers/assignment");
const { isTokenValid } = require("../utils/jwt");

router.post("/submit", isTokenValid, submitAssignment);
router.delete("/delete/:id", isTokenValid, deleteAssignment);
router.get("/", isTokenValid, getAllAssignments);
router.get("/:id", isTokenValid, getOneAssignment);

module.exports = router;
