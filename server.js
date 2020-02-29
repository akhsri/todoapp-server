const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
var morgan = require("morgan");

// create express app
const app = express();

//var morgan = require("morgan");
var passport = require("passport");

// allow CORS
app.use(cors());

app.use(morgan("combined"));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

require("./config/passport");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Todo application. Organize all your work and never miss a thing"
  });
});

// Require user routes
//require("./app/routes/user.routes")(app);

// ........
app.use(passport.initialize());

// Require Users routes
require("./app/routes/user.routes.js")(app);

//Require cards routes
require("./app/routes/card.routes.js")(app);

// listen for requests
app.listen(3005, () => {
  console.log("Server is listening on port 3005");
});
