const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();

router.post("/users",userController.createUser);
router.get("/view",userController.viewUsers);
router.patch("/user-update/:id",userController.updateUser);

module.exports = router;