//Path
const path = require("path");

//Express
const express = require("express");
//Collects all the routes - rename to controllers
const routes = require("./controllers");
//connection.js connection
const sequelize = require("./config/connnection");

//Handlebar consts
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

//Express
const app = express();
//Switch to activate heroku or local host as needed.
const PORT = process.env.PORT || 3001;

//Handlebars middleware - template engine of choice
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connects to folder "public"
app.use(express.static(path.join(__dirname, "public")));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now serving wicked good blogs"));
});
