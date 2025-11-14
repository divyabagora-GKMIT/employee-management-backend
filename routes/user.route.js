const express = require("express");
const { userController } = require("../controllers");
const router = express.Router();

router.post("/users",userController.createUser);

module.exports = router;