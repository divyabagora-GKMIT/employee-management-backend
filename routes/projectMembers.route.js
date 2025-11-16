const express = require("express");
const {projectMembersController} = require("../controllers")
const router = express.Router();

router.post("/project",projectMembersController.assignProject);
router.get("/getProjects/:id",projectMembersController.getProjectByUserId);

module.exports = router;