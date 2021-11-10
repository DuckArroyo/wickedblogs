//connects to express
const router = require("express").Router();

//gives userRoutes the attribute to call user-routes
const userRoutes = require("./user-routes.js");
//appends the path /users to all the call ins userRoutes
router.use("/users", userRoutes);

//So it is easier to understand. Stack the code so each goes with its match.

module.exports = router;
