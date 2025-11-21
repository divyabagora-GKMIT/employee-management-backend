const express = require("express")
const { authController } = require("../controllers");
const verifyToken = require("../middlewares/verifyToken.middleware");
const authorizedRoles = require("../middlewares/authorizedRoles");
const router = express.Router();

router.post("/login", authController.loginUser);
router.patch("/reset", verifyToken, authorizedRoles(1, 2, 3), authController.resetPassword);

module.exports = router;
