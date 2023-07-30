import { Levels } from "../models/levels.js";
import { User } from "../models/user.js";
import { Items } from "../models/items.js";

export const getLevels = async (req, res, next) => {
  console.log("requset get levels");
  try {
    const levels = await Levels.find();
    if (!levels) {
      const error = new Error("levels not exsits ");
      throw error;
    }
    res.status(401).json({ levels: levels });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const addLevel = async (req, res, next) => {
  console.log("add level");
  const name = req.body.name;
  const userId = req.body.userId;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      const error = new Error("user not found ");
      throw error;
    }
    if (!user.isAdmin) {
      const error = new Error("user not admin ");
      throw error;
    }
    const level = new Levels({ name: name, creator: userId });
    const result = await level.save();

    res.json({ message: "add level", levelId: result._id });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addItem = async (req, res, next) => {
  const name = req.body.name;
  const goal = req.body.goal;
  const score = req.body.score;
  const levelId = req.body.levelId;
  const item = new Items({
    name: name,
    goal: goal,
    score: score,
    levelId: levelId,
  });
  try {
    const saveItem = await item.save();
    const level = await Levels.findById(levelId);
    level.items.push(item);
    const result = await level.save();
    res.status(201).json({
      message: "item added",
      item: item,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getItems = async (req, res, next) => {
  const levelId = req.params.levelId;
  console.log(levelId);
  try {
    const level = await Levels.findById(levelId);
    if (!level) {
      const error = new Error("levels not exsits ");
      throw error;
    }
    console.log(level.name);
    const itemsLevel = [];
    for (const item of level.items) {
      itemsLevel.push(await Items.findById(item._id));
    }
    res.json({ items: itemsLevel });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
