const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  cohort: { type: Number, required: true },
  pagesCreated: [{ type: Schema.Type.ObjectId, ref: "Page" }],
  pagesEdited: [{ type: Schema.Type.ObjectId, ref: "Page" }],
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;
