const User = require("../models/user");

exports.signup = (req, res, next) => {
  console.log("signup requset");
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const user = new User({ name, email, password });
  user
    .save()
    .then((result) => {
      res.status(401).json({ message: "User created", userId: result._id });
    })
    .catch((err) => console.log(err));
};
exports.login = (req, res, next) => {
  console.log("login request");
};
