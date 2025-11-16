const express = require("express");
const { departmentController } = require("../controllers");
const router = express.Router();
console.log(typeof departmentController.createDepartment);

router.post("/",departmentController.createDepartment)
router.get("/", departmentController.viewDepartments);
router.patch("/:id",departmentController.updateDepartment);
router.delete("/:id",departmentController.deleteDepartment);

module.exports = router;