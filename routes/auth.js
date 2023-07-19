const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

router.put("/signup", authController.signup);
router.post("/login", authController.login);
router.put("/giveItem", authController.giveItem);
router.get("/leaderboard", authController.leaderboard);

module.exports = router;
