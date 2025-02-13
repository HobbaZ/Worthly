const { Schema } = require("mongoose");

//Subdocument schema
const itemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },

  purchasePrice: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },

  itemImages: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  purchaseDate: {
    type: String,
    required: true,
  },
});

module.exports = itemSchema;
