const express = require("express");
const { departmentMembersController } = require("../controllers")
const router = express.Router();

router.post("/", departmentMembersController.assignDepartment);
router.get("/:id", departmentMembersController.getDepartmentByUserId);
router.delete("/departments/:id1/members/:id2", departmentMembersController.deleteMemberFromDepartment)
module.exports = router;