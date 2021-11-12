//connects to express
const router = require("express").Router();

//Connects to connection.js
const sequelize = require("../config/connnection");
//Connect to the models this will allow access to populate the fields.
const { Post, User, Comment } = require("../models");

//! home-routes.js makes the main.handlebars page dynamic
//connects to homepage in the views folder. Path is not direct

//Page with all the post "default page"
//This page is the catch all for misroutes and shows a full load of posts.
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
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Route for login page
router.get("/login", (req, res) => {
  //Checks for a session and redirects if the user is not logged in.
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  console.log("User was redirected, not logged in");
  res.render("login");
});

//Single-post route
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
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
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
