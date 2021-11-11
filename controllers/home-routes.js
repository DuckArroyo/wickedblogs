//connects to express
const router = require("express").Router();

//Connects to connection.js
const sequelize = require("../config/connnection");
//Connect to the models this will allow access to populate the fields.
const { Post, User, Comment } = require("../models");

//! home-routes.js makes the main.handlebars page dynamic
//connects to homepage in the views folder. Path is not direct

//Page with all the post "default page"
//! What is the proper naming convention for this type of path?
router.get("/", (req, res) => {
  //directly renders homepage
  //It is it's own API call
  Post.findAll({
    attributes: [
      "id",
      "blog_post",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      //This will loop over and map each sequelize object and passes them to posts as an array
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      // posts is passed as an objet with an array
      res.render("homepage", { posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Route for login page
router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
