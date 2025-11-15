const express =  require("express")
const { authController } = require("../controllers")
const router = express.Router();

router.post("/login",authController.loginUser);

module.exports = router;
