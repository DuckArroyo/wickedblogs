//Connects to Model (parent) will give User properties.
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connnection");

// create Post model
class Post extends Model {
  //This method handled the complicated voting query used in /upvote
  static upvote(body, models) {
    //built so it works as Sequelize built in method.
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id,
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id,
        },
        attributes: [
          "id",
          "blog_post",
          "title",
          "created_at",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
            ),
            "vote_count",
          ],
        ],
      });
    });
  }
}

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
