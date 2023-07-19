const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const levelsSchema = new Schema({
  name: { type: "String", required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "Items" }],
});
