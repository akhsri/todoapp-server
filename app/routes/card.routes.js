module.exports = app => {
  const cards = require("../controllers/card.controller");
  const auth = require("../../config/api.auth");

  // Create a new card
  app.post("/cards", auth, cards.create);

  // Retrieve all cards of a user
  app.get("/cards", auth, cards.findAll);

  // Retrieve a single cards with cardId
  app.get("/cards/:cardId", auth, cards.findOne);

  // Delete a card with cardId
  app.delete("/cards/:cardId", cards.delete);
};
