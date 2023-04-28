const router = require("express").Router();

const {
  getAllModules,
  getModule,
  createModule,
} = require("../controllers/moduleController");

router.get("/modules", getAllModules);
router.get("/modules/:id", getModule);
router.post("/modules/:courseId", createModule);

module.exports = router;
