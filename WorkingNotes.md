# Module 13

Create repo and clone

Install dependencies

create db and run db in mysql

source <folder>/filename.extension

verify creation show databases;

connect the application - config

.env installation

## Create the models

models/index.js is the home for the models

- created user model
  This is where the definitions that will be inherited by sql/db will take place

## Create the routes for this model -REST/CRUD

This naming convention along with the use of the HTTP methods follow a famous API architectural pattern called REST, or Representational State Transfer. APIs built following this pattern are what's known as RESTful APIs.

Creating the model followed by the api route allows for testing as we go.

routes folder holds

-- router file and api folder

--- api folder holds

---- holds individual routes - index.js, user-routes.js

## Create server.js file

Created at this point so there is a reference. (user routes)
server.js

-- This is the time to test server

Once tested test get, post, delete. if all works move forward.

## Should be able to deploy to heroku here.

## Protect the passwords

exclude attribute method

## Install bcrypt

require bcrypt in User.js and insert into User model with hooks in the second object of User.

## Create login call in user-routes.js

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

## Post Model

Create post.js in models.
Import model, connection
Define the structure of the Post
and export

## Define relationships between models aka connect the tables in the db.

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

## Back code in the new Votes feature

include the sequelize.literal to pull the votes information.
Upvote was cleaned up quire abit. The upvote route now uses Vote model to handle procesing. Tested successfully.

## Create the Comments model and the routes for the model

## Deploy to Heroku

Heroku [Link](https://sleepy-caverns-39452.herokuapp.com//)

Heroku Git [Link](https://git.heroku.com/sleepy-caverns-39452.git)

- In Heroku
  Install JawsDB in the Resources tab

- Change this settings in the code - connections.js
  heroku create

  heroku login

  git push heroku main

  git add -A

  git commit -m "connect to jawsdb"

  git push heroku main

# Module 14

## Style it 14.1.3

# HTML via handle bars

explanation on 14.1.4

install express- handlebars

create Views folder

- homepage.handlebars
- welcome.handlebars

inside create layouts folder

- main.handlebars

rename routes to Controllers to fit the MVC model.

The main.handlebars file used three curly brackets as {{{ body }}}, but here we're only using two brackets as {{ title }}. Why is that? The difference is that two brackets will convert HTML characters to strings. For instance, < would become &lt;. Three brackets, on the other hand, will render the data as HTML.

For more information, review the [Handlebars.js docs on HTML escaping](https://handlebarsjs.com/guide/#html-escaping)

# home-routes.js

Serves

- main page
- dashboard
- login

home-routes.js is setup as a template to receive the posts as an object package.

next build in the helpers to process the information being passed between the templates.

# Handlebars and javascript

14.2.4 Front End logic

in this step add navigation buttons

- post
- login
- log out
- main page

- Login/signup
  The login hadlebars file is the screen shown.
  The login.js file manages the functionality.
  The async and await keywords confirm the promise functionality
  Followed by storing the fetch into response which can later be used with ok to indicate a successful response.
  Then - the then and catch can be ommited.

# Install express-sessions and connect-session-sequelize

The express-session library allows us to connect to the back end. The connect-session-sequelize library automatically stores the sessions created by express-session into our database

<!-- Ask this question  -->
<!-- I would like to embed this code into the post page for visitors to know they visited and for the blogger to see how many views they have. !dashboard, createpost,? -->

if(!req.session.views){
req.session.view = 1;
console.log("This is your first visit");
} else {
req.session.views++
console.log(`You have visited ${req.session.views} times`);
}

Install npm package

# Setup > Will create login state

Add code to serve.js file in root folder.
Set the secret variable and secret in .env file.
Add the information to the routes

- user-routes.js > into the post > then
- user-routes.js > into the login > then

- home-routes.js > into the login

In the main body of the call add if logged in to route user back to main page otherwise continue to login.

# Setup > Will create a detroy the session state.

3 to dos

- create a route in the user-routes /logout and use destroy method to destroy the session.
- create the button to trigger the route "logout"
- create the logout.js file to handle the logic
  Button press listener
  trigger async function
  create fetch request
  get response

# Single post hadlebars

Create single post.handlebars file
it contains the code for 1 post.
Connects to home-routes.js where the route resides.

Then, include a form to accept comments and upvotes. This will also carry the loading of comments for the post.

Now the logic for the comments functionality. (Front End)
comment.js
upvote.js

Jump to the post-routes.js
Since this can only be done by a current user, encampuslate in if(req.session), so only users can vote
pass the body, the user.id:re.session.id info, and the models to be destructure.

Comments go to the comment-routes.js
The POST API call just needs to match the fetch

# Conditional statements - Helpers -

Functionality for logged in users only
{{#if value}}
{{/if}}

handlebars
If an item like a button is invoking logic, apply the same #if

backend - all the pages (through the routes) that apply
the loggedIn item needs to be added to the .then in the route

Install jest to test the app, setup test and utils
Then import helper functions to server to pass onto handlebars
then the helpers can be implemented like this.
created_at > format_date created_at
Similar to format_date(created_at)

# Creating the dashboard - 14.5.3

create dashboard.handlebars
add connections to index in the same folder
create dashboard-routes.js and add get 
add href "button" to main which will manually route to dashboard
And add logic to login.js that automatically redirects to dashboard instead of the homepage
make the dashboard visible to logged in users by adding withAuth to  route.
The dashboard employs the edit functionality to edit the user's own posts
