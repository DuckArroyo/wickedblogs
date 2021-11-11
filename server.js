//Path
const path = require("path");

//Express
const express = require("express");
//Collects all the routes
const routes = require("./routes");
//connection.js connection
const sequelize = require("./config/connnection");

//Express
const app = express();
//Switch to activate heroku or local host as needed.
const PORT = process.env.PORT || 3001;

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
