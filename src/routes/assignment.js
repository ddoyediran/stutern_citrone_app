const router = require("express").Router();
const {
  submitAssignment,
  deleteAssignment,
  getAllAssignments,
  getOneAssignment,
  getAssignmentGrade,
} = require("../controllers/assignment");
const { isTokenValid } = require("../utils/jwt");
const upload = require("../utils/multer");

router.post(
  "/submit",
  isTokenValid,
  upload.single("submitted_file"),
  submitAssignment
);
router.delete("/delete/:id", isTokenValid, deleteAssignment);
router.get("/", isTokenValid, getAllAssignments);
router.get("/:id", isTokenValid, getOneAssignment);
router.get("/grade/:id", isTokenValid, getAssignmentGrade);

module.exports = router;
