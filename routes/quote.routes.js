const router = require("express").Router();
const passport = require("passport");

const Quote = require("../models/QuoteModel");

router.post(
  "/quote",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      //deestructuring user's cohort
      const { cohort } = req.user;

      //Creating page in database with user's cohort
      const result = await Quote.create({
        ...req.body,
        cohort: cohort,
      });

      return res.status(201).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

router.get(
  "/quote",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { cohort } = req.user;

      const allQuotes = await Quote.find({ cohort: cohort });

      if (allQuotes) {
        const randomNum = Math.round(Math.random() * allQuotes.length);

        const result = allQuotes[randomNum];

        return res.status(200).json(result);
      }

      return res
        .status(404)
        .json({ msg: "There are no quotes in this cohort. =(" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

module.exports = router;
