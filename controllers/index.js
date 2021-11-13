//! This file collects all of the endpoints and prefixes them
//connects to express
const router = require("express").Router();

//Homepage routes
const homeRoutes = require("./home-routes.js");
router.use("/", homeRoutes);

//connects this file to the files contained in the api folder
const apiRoutes = require("./api");
//apends the path /api to the routes that come from /api
router.use("/api", apiRoutes);

//mergers Dashboard route
const dashboardRoutes = require("./dashboard-routes.js");
//Prefixes all dashboard views with
router.use("/dashboard", dashboardRoutes);

//provides an error indicating the resource does not exist
router.use((req, res) => {
  res.status(404).end();
});

//Exports one layer up to server.
module.exports = router;
