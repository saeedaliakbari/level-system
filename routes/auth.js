// const express = require("express");
import express from "express";
const router = express.Router();
import { signup, login, giveItem, leaderboard } from "../controller/auth.js";

router.put("/signup", signup);
router.post("/login", login);
router.put("/giveItem", giveItem);
router.get("/leaderboard", leaderboard);

export default router;
