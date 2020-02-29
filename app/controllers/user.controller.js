var passport = require("passport");
var mongoose = require("mongoose");
const User = require("../models/user.js");

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  // var user = new User({
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   email: req.body.email
  // });
  // user.setPassword(req.body.password);
  user
    .save()
    .then(user => {
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token,
        user: user
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
};

// Retrieve and return all users from the database.users
exports.findAll = (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  console.log(req.params);
  console.log("req.user: ", req.user);
  console.log("req.headers: ", req.headers);
  User.findById(req.user._id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.user._id
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.user._id
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.user._id
      });
    });
};

module.exports.login = function(req, res) {
  console.log("line 49");
  if (!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      message: "All fields required"
    });
    console.log(err);
    return;
  }

  passport.authenticate("local", function(err, user, info) {
    var token;
    console.log(token);

    // If Passport throws/catches an error
    //console.log("line 62");
    if (err) {
      res.status(404).json(err);
      console.log(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token
      });
      //console.log("line 76");
    } else {
      // If user is not found
      res.status(401).json(info);
      console.log(err);
      //console.log("line 81");
    }
  })(req, res);
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then(user => {
      // if(!user) {
      //     return res.status(404).send({
      //         message: "User not found with id " + req.params.userId
      //     });
      // }
      res.send({ message: "User deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId
      });
    });
};
