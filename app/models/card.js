const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  cardHeader: {
    type: String,
    required: true,
    trim: true
  },
  scheduledAt: {
    type: String,
    required: true,
    trim: true
  },
  workDescription: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
