//Express
const express = require("express");
//Collects all the routes
const routes = require("./routes");
//connection.js connection
const sequelize = require("./config/connnection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now serving wicked good blogs"));
});
