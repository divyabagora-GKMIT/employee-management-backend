const express =  require("express")
const { authController } = require("../controllers")
const router = express.Router();

router.post("/login",authController.loginUser);
router.patch("/reset",authController.resetPassword);

module.exports = router;
