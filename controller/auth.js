import { User } from "../models/user.js";
import { Items } from "../models/items.js";

export const signup = async (req, res, next) => {
  console.log("signup requset");
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = User.findOne({ email: email });
    if (!user) {
      const user = new User({ name, email, password });
      const result = await user.save();
    } else {
      const error = new Error("email already exsits ");
      throw error;
    }
    res.status(401).json({ message: "User created", userId: result._id });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
export const login = async (req, res, next) => {
  console.log("login request");
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 401;
      throw error;
    }
    console.log(user);
    if (user.password === password) {
      res.status(200).json({
        message: "login success",
        userId: user._id.toString(),
      });
    } else {
      const error = new Error("password is wrong");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const giveItem = async (req, res, next) => {
  console.log("give Item");
  const itemId = req.body.itemId;
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    const item = await Items.findById(itemId);
    user.items.push(item);
    user.score += item.score;
    await user.save();
    res.status(401).json({ message: "item added and score update " });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const leaderboard = async (req, res, next) => {
  const users = await User.find().sort({ score: -1 });
  res.json({ users: users });
};
