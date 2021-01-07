const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/tassiaaccioly/image/upload/v1608044548/ironnotes/bunnyyy_yqiwod.png",
    },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    cohort: { type: String, required: true },
    pagesCreated: [{ type: Schema.Types.ObjectId, ref: "Page" }],
    pagesEdited: [{ type: Schema.Types.ObjectId, ref: "Page" }],
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

const UserModel = model("User", UserSchema);

module.exports = UserModel;
