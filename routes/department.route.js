const express = require("express");
const { departmentController } = require("../controllers");
const router = express.Router();
console.log(typeof departmentController.createDepartment);

router.post("/department",departmentController.createDepartment)
router.get("/viewDepartment", departmentController.viewDepartments);
router.patch("/remove/:id",departmentController.deleteDepartment);
router.patch("/update/:id",departmentController.updateDepartment);
module.exports = router;