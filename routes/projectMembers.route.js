const express = require("express");
const {projectMembersController} = require("../controllers")
const router = express.Router();

router.post("/",projectMembersController.assignProject);
router.get("/:id",projectMembersController.getProjectByUserId);
router.patch("projects/:id1/members/:id2",projectMembersController.updateProjectRole);
router.delete("projects/:id1/members/:id2",projectMembersController.deleteProjectMember);

module.exports = router;