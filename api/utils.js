function requireUser(req, res, next) {
    if (!req.user) {
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    } else if(!req.user.active && req.baseUrl === '/api/posts') {
        next({
            name: "MissingActiveUserError",
            message: "You must be an active user to perform this action"
          });
    }
    next();
}
  
module.exports = {
    requireUser
}