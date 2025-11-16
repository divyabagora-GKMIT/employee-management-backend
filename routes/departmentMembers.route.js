const express = require("express");
const {departmentMembersController} = require("../controllers")
const router = express.Router();

router.post("/department",departmentMembersController.assignDepartment);
router.get("/getDepartment/:id",departmentMembersController.getDepartmentByUserId);

module.exports = router;