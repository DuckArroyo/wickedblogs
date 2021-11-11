//Path
const path = require("path");

//Express
const express = require("express");

//Collects all the routes - rename to controllers
const routes = require("./controllers");

//connection.js connection
const sequelize = require("./config/connnection");

//Express
const app = express();

//express-session
const session = require("express-session");

//Sequelize store - requires the c-s-s and passes session.Store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//setting for the session
const sess = {
  //hash base authentication code
  secret: "SESS_SECRET",
  //starts empty
  cookie: {},
  //forces the session to be resave to the session
  resave: false,
  //session is saved as part ofthe store
  saveUninitialized: true,
  //saves to the database through sequelize
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//Stores sess into session which will be passed above
app.use(session(sess));

//connection to .env file
require("dotenv").config();

//Handlebar consts
const exphbs = require("express-handlebars");
//hbs template/
const hbs = exphbs.create({});

//Switch to activate heroku or local host as needed.
const PORT = process.env.PORT || 3001;

//Handlebars middleware - template engine of choice
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//! What is this?
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
