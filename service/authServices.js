import userData from "../database/userData.js";
// const userData = require("../database/userData");
export const createUser = async (name, email, password) => {
  let user = await userData.getUserDataByEmail(email);
  if (user) {
    const error = new Error("email already exsits ");
    throw error;
  }
  return await userData.createNewUser(name, email, password);
};
