const express = require("express");
const {projectMembersController} = require("../controllers")
const router = express.Router();

router.post("/",projectMembersController.assignProject);
router.get("/projects/:id",projectMembersController.getProjectByUserId);
router.get("/members/:id",projectMembersController.getUsersByProjectId);
router.patch("/projects/:id1/members/:id2",projectMembersController.updateProjectRole);
router.delete("/projects/:id1/members/:id2",projectMembersController.deleteProjectMember);

module.exports = router;