//connects to express
const router = require("express").Router();

//So it is easier to understand. Stack the code so each goes with its match.
//gives userRoutes the attribute to call user-routes
const userRoutes = require("./user-routes.js");
//appends the path /users to all the call ins userRoutes
router.use("/users", userRoutes);

//Same as userRoutes.
const postRoutes = require("./post-routes");
router.use("/posts", postRoutes);

//exports to one router which is one layer up in routes folder
module.exports = router;
