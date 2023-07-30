import user from "../models/user.js";

export const getUserDataByEmail = async (email) => {
  const users = await user.findOne({ email: email });
  if (!users) {
    const error = new Error("user not found");
    error.statusCode = 401;
    throw error;
  }
  return user;
};

export const createNewUser = async (name, email, password) => {
  const newUser = new User({ name, email, password });
  return await newUser.save();
};
