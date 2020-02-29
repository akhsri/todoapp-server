module.exports = app => {
  const users = require("../controllers/user.controller");
  const auth = require("../../config/api.auth");

  // Create a new user
  app.post("/users", users.register);

  // Retrieve all Users
  app.get("/users", users.findAll);

  // Retrieve a single User with userId
  app.get("/users/me", auth, users.findOne);

  //Login
  app.post("/users/login", users.login);

  // Delete a user with userId
  app.delete("/users/:userId", users.delete);
};
