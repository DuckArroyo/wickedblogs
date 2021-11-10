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
