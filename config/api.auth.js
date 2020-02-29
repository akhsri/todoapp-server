var jwt = require("express-jwt");
var auth = jwt({
  secret: "MY_SECRET",
  userProperty: "user"
});

module.exports = auth;
