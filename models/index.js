//! Home for the models and their relationships
//index.js imports the model and exports as an object

//Calls the user file in this same folder
const User = require("./User");

//Calls the post file in this same foldel
const Post = require("./Post");

//Calls the vote file in this same foldel
const Vote = require("./Vote");

//! Create relationships

//One couple <=>
User.hasMany(Post, { foreignKey: "user_id" });
Post.belongsTo(User, { foreignKey: "user_id" });

User.belongsToMany(Post, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "user_id",
});

Post.belongsToMany(User, {
  through: Vote,
  as: "voted_posts",
  foreignKey: "post_id",
});

Vote.belongsTo(User, {
  foreignKey: "user_id",
});

Vote.belongsTo(Post, {
  foreignKey: "post_id",
});

User.hasMany(Vote, {
  foreignKey: "user_id",
});

Post.hasMany(Vote, {
  foreignKey: "post_id",
});
//Exports information as an object
module.exports = { User, Post, Vote };
