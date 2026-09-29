const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({

  pizzaId: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    default: 1,
    min: 1
  }

});


const cartIngredientSchema = new mongoose.Schema({

  ingredientId: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    default: 1,
    min: 1
  }

});


const cartSchema = new mongoose.Schema({

  items: {
    type: [cartItemSchema],
    default: []
  },

  ingredients: {
    type: [cartIngredientSchema],
    default: []
  }

}, {
  collection: 'cart'
});


module.exports = mongoose.model('Cart', cartSchema);