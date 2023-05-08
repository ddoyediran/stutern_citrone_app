const router = require("express").Router();
const { isTokenValid } = require("../utils/jwt");

const {
  getAllModules,
  getModule,
  createModule,
} = require("../controllers/moduleController");

router.get("/modules", isTokenValid, getAllModules);
router.get("/modules/:moduleId", getModule);
router.post("/modules/:courseId", isTokenValid, createModule);

module.exports = router;
