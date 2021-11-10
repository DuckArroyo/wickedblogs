const router = require("express").Router();
//We connect to post and user to have the full set of data.
const { Post, User } = require("../../models");

// get all users
router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    //Find the posts with these columns
    attributes: ["id", "blog_post", "title", "created_at"],
    //also give me the User name
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//index.js in this folder is the router
module.exports = router;
