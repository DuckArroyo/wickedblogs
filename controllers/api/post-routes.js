const router = require("express").Router();
const sequelize = require("../../config/connnection");

//We connect to post, user, and vote to have the full set of data.
const { Post, User, Vote, Comment } = require("../../models");

// get all users - works DESC
router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    //Find the posts with these columns
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
    //In this order
    order: [["created_at", "DESC"]],
    //also give me the User name
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
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Get all users ASC
router.get("/ASC", (req, res) => {
  console.log("======================");
  Post.findAll({
    //Find the posts with these columns
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
    //In this order
    order: [["created_at", "ASC"]],
    //also give me the User name
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
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Get this one post //! I think this will be important for the blog
router.get("/:id", (req, res) => {
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
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Create a post - works
router.post("/", (req, res) => {
  // expects {title: 'Taskmaster goes public!', blog_post: 'blah blah', user_id: 1}
  //Equivalent of Insert in SQL
  Post.create({
    title: req.body.title,
    blog_post: req.body.blog_post,
    user_id: req.body.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/posts/upvote
router.put("/upvote", (req, res) => {
  //Static method created in models/Post.js
  Post.upvote(
    req.body,
    { Vote }

    //These are the original parameters passing to the route.
    //They are being updated with the code above which uses the model to process
    // user_id: req.body.user_id,
    // post_id: req.body.post_id,
  )

    .then((updatePostData) => res.json(updatePostData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//UPDATE a post  - works
router.put("/:id", (req, res) => {
  // expects {title: 'Taskmaster goes public!', blog_post: 'blah blah', user_id: #}
  Post.update(
    {
      title: req.body.title,
      blog_post: req.body.blog_post,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//DELETE a post - Works
router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//index.js in this folder is the router
module.exports = router;
