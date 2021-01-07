const { Schema, model } = require("mongoose");

const PageSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    tags: [{ type: String, required: true }],
    creatorUser: { type: Schema.Types.ObjectId, ref: "User" },
    editorUser: [{ type: Schema.Types.ObjectId, ref: "User" }],
    cohort: { type: String },
  },
  {
    toJSON: {
      transform: (doc, returnDoc) => {
        delete returnDoc.__v;
        return returnDoc;
      },
    },
  }
);

const PageModel = model("Page", PageSchema);

module.exports = PageModel;
