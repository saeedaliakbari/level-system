import express from "express";
const router = express.Router();
import {
  getLevels,
  addItem,
  addLevel,
  getItems,
} from "../controller/levels.js";

router.get("", getLevels);
router.post("/addlevel", addLevel);
router.post("/addItem", addItem);
router.get("/Items/:levelId", getItems);
export default router;
