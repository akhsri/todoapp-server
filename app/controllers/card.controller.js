const Card = require("../models/card");

var sendJSONresponse = function(res, status, content) {
  res.status(response);
  res.json(content);
};

module.exports.create = function(req, res) {
  var card = new Card();

  card.cardHeader = req.body.cardHeader;
  card.scheduledAt = req.body.scheduledAt;
  card.workDescription = req.body.workDescription;
  card.userId = req.user._id;
  console.log("userId: ", card.userId);
  card
    .save()
    .then(card => {
      res.status(200);
      res.json({
        card: card
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
};

// Retrieve and return all cards of a user from database
exports.findAll = (req, res) => {
  Card.find({
    userId: req.user._id
  })
    .then(cards => {
      res.status(200).json(cards);
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occured while retreiving card of the user"
      });
    });
};

// Find a single card of a user with a cardId
exports.findOne = (req, res) => {
  Card.findOne({
    _id: req.params.cardId,
    userId: req.user._id
  })
    .then(card => {
      if (!card) {
        return res.status(404).send({
          message: `Card not found with cardId ${req.params.cardId} corresponding to the UserId ${req.user._id}`
        });
      }
    })
    .catch(err => {
      if (err.kind === "Objectid") {
        return res.status(404).send({
          message: `Card not found with cardId ${req.params.cardId} corresponding to the UserId ${req.user._id}`
        });
      }
    });
};
// Delete a single card of a user with a cardId
exports.delete = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => {
      if (!card) {
        return res.status(404).send({
          message: "Card not found with id " + req.params.cardId
        });
      }
      res.send({ message: "Card deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Card not found with id " + req.params.cardId
        });
      }
      return res.status(500).send({
        message: "Could not delete card with id " + req.params.cardId
      });
    });
};
