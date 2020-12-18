const router = require("express").Router();
const passport = require("passport");

const Page = require("../models/PageModel");
const User = require("../models/UserModel");

//Crud CREATE PAGE
router.post(
  "/pages",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      //deestructuring user's cohort
      const { cohort } = req.user;

      //spliting tags into arrays
      const tags = req.body.tags.toLowerCase().split(",");

      //Creating page in database with user's cohort
      if (tags) {
        const result = await Page.create({
          ...req.body,
          creatorUser: req.user._id,
          tags: tags,
          cohort: cohort,
        });

        const userResult = await User.findOneAndUpdate(
          { _id: req.user._id },
          { $push: { pagesCreated: result._id } },
          { new: true }
        );

        return res.status(201).json({ result, userResult });
      }
      const tag = [...req.body.tags];

      const result = await Page.create({
        ...req.body,
        creatorUser: req.user._id,
        tags: tag,
        cohort: cohort,
      });

      //Updating User profile to add page created to profile
      const userResult = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { pagesCreated: result._id } },
        { new: true }
      );

      return res.status(201).json({ result, userResult });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

//cRud GET PAGES LIST
router.get(
  "/pages",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      //return only the pages from the user cohort
      const result = await Page.find({ cohort: req.user.cohort })
        .populate("creatorUser")
        .populate("editorUser");

      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

//cRud GET PAGES LIST (ONLY TITLES)
router.get(
  "/titles",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await Page.find(
        { cohort: req.user.cohort },
        //return only the titles and id from the search
        { title: 1, _id: 1 }
      );

      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

//CRud GET PAGE
router.get(
  "/pages/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;

      const page = await (await Page.findOne({ _id: id }))
        .populate("creatorUser")
        .populate("editorUser");

      if (page) {
        return res.status(200).json(page);
      }

      return res.status(404).json({ msg: "Page not found" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

//crUd EDIT PAGE
router.patch(
  "/pages/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      //get id from url (params)
      const { id } = req.params;

      //Find the page to patch
      const pageId = await Page.findOne({ _id: id });

      //if user cohort is the same as page cohort make changes, if not, return error
      if (req.user.cohort === pageId.cohort) {
        const userId = req.user._id;

        const tags = req.body.tags.toLowerCase().split(",");

        //find the page by id and update from req.body, return the updated page
        const page = await Page.findOneAndUpdate(
          { _id: id },
          { ...req.body, tags: tags },
          {
            new: true,
          }
        );

        //find page by id, update editor, return the updated page
        const pageResult = await Page.findOneAndUpdate(
          { _id: id },
          { $push: { editorUser: userId } },
          { new: true }
        );

        //find user by id, update pagesEdited with page id, return updated user
        const user = await User.findOneAndUpdate(
          { _id: userId },
          { $push: { pagesEdited: id } }
        );

        return res.status(202).json({ pageResult, user });
      }

      return res
        .status(401)
        .json({ msg: "You don't have clearance to edit this page." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

router.delete(
  "/pages/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      //get id from url (params)
      const { id } = req.params;

      //Find the page to delete
      const pageId = await Page.findOne({ _id: id });

      //if user cohort is the same as page cohort delete, if not, return error
      if (req.user.cohort === pageId.cohort) {
        const deletedPage = await Page.findOneAndDelete({ _id: id });

        return res.status(204).json({});
      }

      return res
        .status(401)
        .json({ msg: "You don't have clearance to edit this page." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

module.exports = router;
