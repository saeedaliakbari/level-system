import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  items: [{ type: Schema.Types.ObjectId, ref: "Items" }],
});
export const User = mongoose.model("User", userSchema);
