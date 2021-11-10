//Connects to Model (parent) will give User properties.
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connnection");

// create Post model
class Post extends Model {}

// create structure for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //!blog post functionality
    blog_post: {
      type: DataTypes.STRING,
      allowNull: false,
      //! set to 5 for testing. Change to 250 once ready to deploy
      validate: {
        // this means the password must be at least 250 characters long
        len: [5],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

//Export
module.exports = Post;
