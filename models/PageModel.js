const { Schema, model } = require("mongoose");

const PageSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  tags: [{ type: String, required: true }],
  creatorUser: { type: Schema.Type.ObjectId, ref: "User" },
  editorUser: [{ type: Schema.Type.ObjectId, ref: "User" }],
  cohort: { type: Number },
});

//use book.routes.js to do the creator/editor push thingy
//Page.find({cohort: req.user.cohort})

const UserModel = model("Page", PageSchema);

module.exports = UserModel;
