const router = require("express").Router();
const { User, Post, Vote, Comment } = require("../../models");
const withAuth = require('../../utils/auth');

// GET /api/users
router.get("/", (req, res) => {
  // Access our User model and run .findAll() method)
  //js equivalent of sql SELECT * FROM users;
  //this is a promise because that is how sequilize works
  User.findAll({
    //method to hide passwords
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/#
router.get("/:id", (req, res) => {
  //js equivalent of sql SELECT * FROM users WHERE id = #
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    // include this
    include: [
      {
        model: Post,
        attributes: ["id", "title", "blog_post", "created_at"],
      },
      // include the Comment model here:
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
      {
        model: Post,
        attributes: ["title"],
        through: Vote,
        as: "voted_posts",
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post("/", (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  //js equivalent of sql INSERT INTO users (username, email, password) VALUES ("Lernantino", "lernantino@gmail.com", "password1234");
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).then((dbUserData) => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      //create the session as a bolean to confirm the user is logged in
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  });
});

// login - validate the user, create a session.
router.post("/login", (req, res) => {
  // Query operation
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }

    // Verify user
    const validPassword = dbUserData.checkPassword(req.body.password);
    //compares passwords as a bolean
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    //Creates the session on login
    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

//logout - destroy the session
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      //204 is confirmation of session destruction
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// PUT /api/users/#
router.put("/:id", (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  //JS quivalent of sql UPDATE users SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234" WHERE id = 1;

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/#
router.delete("/:id", withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//index.js in this folder is the router
module.exports = router;
