Create repo and clone

Install dependencies

create db and run db in mysql

source <folder>/filename.extension

verify creation show databases;

connect the application - config

.env installation

# Create the models

models/index.js is the home for the models

- created user model
  This is where the definitions that will be inherited by sql/db will take place

# Create the routes for this model -REST/CRUD

This naming convention along with the use of the HTTP methods follow a famous API architectural pattern called REST, or Representational State Transfer. APIs built following this pattern are what's known as RESTful APIs.

Creating the model followed by the api route allows for testing as we go.

routes folder holds

-- router file and api folder

--- api folder holds

---- holds individual routes - index.js, user-routes.js

# Create server.js file

Created at this point so there is a reference. (user routes)
server.js

-- This is the time to test server

Once tested test get, post, delete. if all works move forward.

## Should be able to deploy to heroku here.

# Protect the passwords

exclude attribute method

# Install bcrypt

require bcrypt in User.js and insert into User model with hooks in the second object of User.

# Create login call in user-routes.js

POST is used in logins because it carries the req.body parameter

http://localhost:3001/api/users/login

Can test in insomnia by useing post, the route above and the email and password.

The User model needs to be updated with the checkPassword method which is then called in the .then of the login route. This in turn compares the two passwords.

User functionality complete, moving to the posts

1. find all the users
2. find one user route - works
3. create a user route - works
4. update a user route - works
5. delete a user route - works

# Post Model

Create post.js in models.
Import model, connection
Define the structure of the Post
and export

# Define relationships between models aka connect the tables in the db.

Define relationships through index.js in the models folder

Once the definition is done, in server.js, switch the force: to true. Switch back after restarting the server.

## Create the routes for post

1. find all the posts (gimme the user name)
2. find one post route - works
3. create a post route - works
4. update a post route - works
5. delete a post route - works

## Create Vote Models and routes

Votes gets a model
Associations in the index.js within Models
But does not get it's own routes as votes are updates to posts.
Vote routes go inside of posts.

# Continue on 13.4.5
