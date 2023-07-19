const express = require("express");
const router = express.Router();
const levelsController = require("../controller/levels");

router.get("", levelsController.getLevels);
router.post("/addlevel", levelsController.addLevel);
router.post("/addItem", levelsController.addItem);
router.get("/Items/:levelId", levelsController.getItems);
module.exports = router;
