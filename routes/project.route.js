const express = require("express");
const { projectController } = require("../controllers");
const router = express.Router();

router.post("/create",projectController.createProject)
router.get("/viewProject", projectController.viewProjects);
router.patch("/remove/:id",projectController.deleteProject);
router.patch("/update/:id",projectController.updateProject);
module.exports = router;