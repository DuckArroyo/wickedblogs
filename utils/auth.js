const withAuth = (req, res, next) => {
  //if no session. Send user to login
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};
//export the function.
module.exports = withAuth;
