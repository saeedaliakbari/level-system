const User = require("../models/user");

exports.signup = (req, res, next) => {
  console.log("signup requset");
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const user = new User({ name, email, password });
        return user.save();
      } else {
        const error = new Error("email already exsits ");
        throw error;
      }
    })
    .then((result) => {
      res.status(401).json({ message: "User created", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.login = (req, res, next) => {
  console.log("login request");
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("user not found");
        error.statusCode = 401;
        throw error;
      }
      console.log(user);
      if (user.password === password) {
        res.status(200).json({
          message: "login success",
          userId: loadedUser._id.toString(),
        });
      } else {
        const error = new Error("password is wrong");
        error.statusCode = 401;
        throw error;
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
