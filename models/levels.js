const mongoose = require("mongoose");
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

module.exports = mongoose.model("Level", levelsSchema);
