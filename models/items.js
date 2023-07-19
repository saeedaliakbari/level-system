const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemsSchema = new Schema({
  name: { type: String, required: true },
  goal: { type: Number, required: true },
  score: { type: Number, required: true },
});

module.exports = mongoose.model("Items", itemsSchema);
