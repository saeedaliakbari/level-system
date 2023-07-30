import mongoose from "mongoose";
const Schema = mongoose.Schema;

const levelsSchema = new Schema({
  name: { type: "String", required: true },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [{ type: Schema.Types.ObjectId, ref: "Items" }],
});
export const Levels = mongoose.model("Level", levelsSchema);
