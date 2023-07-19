const Levels = require("../models/levels");
const User = require("../models/user");
const Items = require("../models/items");
const items = require("../models/items");
const levels = require("../models/levels");

exports.getLevels = (req, res, next) => {
  console.log("requset get levels");
  Levels.find().then((levels) => {
    if (!levels) {
      const error = new Error("levels not exsits ");
      throw error;
    }
    res.status(401).json({ levels: levels });
  });
};

exports.addLevel = (req, res, next) => {
  console.log("add level");
  const name = req.body.name;
  const userId = req.body.userId;
  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        const error = new Error("user not found ");
        throw error;
      }
      if (!user.isAdmin) {
        const error = new Error("user not admin ");
        throw error;
      }
      const level = new Levels({ name: name, creator: userId });
      return level.save();
    })
    .then((level) => res.json({ message: "add level", levelId: level._id }))
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addItem = (req, res, next) => {
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
  item
    .save()
    .then((item) => {
      return levels.findById(levelId);
    })
    .then((level) => {
      level.items.push(item);
      return level.save();
    })
    .then((reuslt) => {
      res.status(201).json({
        message: "item added",
        item: item,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getItems = async (req, res, next) => {
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

