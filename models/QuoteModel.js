const { Schema, model } = require("mongoose");

const QuoteSchema = new Schema(
  {
    said_by: { type: String, required: true },
    quote: { type: String, required: true },
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

//use book.routes.js to do the creator/editor push thingy
//Page.find({cohort: req.user.cohort})

const QuoteModel = model("Quote", QuoteSchema);

module.exports = QuoteModel;
