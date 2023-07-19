const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  name: { type: String, required: true },
  goal: { type: Number, required: true },
  score: { type: Number, required: true },
  levelId: { type: Schema.Types.ObjectId, ref: "Level" },
});

module.exports = mongoose.model("Items", itemsSchema);
