//connects to express
const router = require("express").Router();

//connects to homepage in the views folder. Path is not direct
//! What is the proper naming convention for this type of path?
router.get("/", (req, res) => {
  //directly renders homepage
  res.render("homepage");
});

module.exports = router;
