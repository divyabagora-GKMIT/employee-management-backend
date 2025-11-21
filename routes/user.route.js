const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();

router.post("/",userController.createUser);
router.get("/",userController.viewUsers);
router.patch("/:id",userController.updateUser);
router.delete("/:id",userController.deleteUser);

module.exports = router;