const express = require("express");
const { projectController } = require("../controllers");
const router = express.Router();

router.post("/",projectController.createProject)
router.get("/", projectController.viewProjects);
router.patch("/:id",projectController.updateProject);
router.delete("/:id",projectController.deleteProject);

module.exports = router;