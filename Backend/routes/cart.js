var express = require('express');
var router = express.Router();

const Cart = require('../models/Cart');
const Pizza = require('../models/Pizza');
const Ingredient = require('../models/Ingredient');


// ==========================================
// GET CART
// ==========================================

router.get('/', async function (req, res) {

  try {

    let cart = await Cart.findOne();

    if (!cart) {
      cart = await Cart.create({
        items: [],
        ingredients: []
      });
    }

    res.status(200).json(cart);

  } catch (error) {

    res.status(500).json({
      message: 'Failed to fetch cart',
      error: error.message
    });

  }

});


// ==========================================
// ADD PIZZA TO CART
// ==========================================

router.post('/', async function (req, res) {

  try {

    const { pizzaId } = req.body;

    const pizza = await Pizza.findOne({
      id: pizzaId
    });

    if (!pizza) {

      return res.status(404).json({
        message: 'Pizza not found'
      });

    }

    let cart = await Cart.findOne();

    if (!cart) {

      cart = await Cart.create({
        items: [],
        ingredients: []
      });

    }

    const existingItem = cart.items.find(
      item => item.pizzaId === pizzaId
    );

    if (existingItem) {

      existingItem.quantity += 1;

    } else {

      cart.items.push({

        pizzaId: pizza.id,
        name: pizza.name,
        type: pizza.type,
        price: pizza.price,
        image: pizza.image,
        quantity: 1

      });

    }

    await cart.save();

    res.status(200).json(cart);

  } catch (error) {

    res.status(500).json({
      message: 'Failed to add pizza to cart',
      error: error.message
    });

  }

});


// ==========================================
// ADD INGREDIENT TO CART
// ==========================================

router.post('/ingredient', async function (req, res) {

  try {

    const { ingredientId } = req.body;

    const ingredient = await Ingredient.findOne({
      id: ingredientId
    });

    if (!ingredient) {

      return res.status(404).json({
        message: 'Ingredient not found'
      });

    }

    let cart = await Cart.findOne();

    if (!cart) {

      cart = await Cart.create({
        items: [],
        ingredients: []
      });

    }

    const existingIngredient =
      cart.ingredients.find(
        item => item.ingredientId === String(ingredientId)
      );

    if (existingIngredient) {

      existingIngredient.quantity += 1;

    } else {

      cart.ingredients.push({

        ingredientId: String(ingredient.id),
        name: ingredient.tname,
        price: ingredient.price,
        image: ingredient.image,
        quantity: 1

      });

    }

    await cart.save();

    res.status(200).json(cart);

  } catch (error) {

    res.status(500).json({
      message: 'Failed to add ingredient',
      error: error.message
    });

  }

});


// ==========================================
// UPDATE PIZZA QUANTITY
// ==========================================

router.patch('/:itemId', async function (req, res) {

  try {

    const { quantity } = req.body;

    const cart = await Cart.findOne();

    if (!cart) {

      return res.status(404).json({
        message: 'Cart not found'
      });

    }

    const item = cart.items.id(req.params.itemId);

    if (!item) {

      return res.status(404).json({
        message: 'Cart item not found'
      });

    }

    if (quantity < 1) {

      return res.status(400).json({
        message: 'Quantity must be at least 1'
      });

    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json(cart);

  } catch (error) {

    res.status(500).json({
      message: 'Failed to update quantity',
      error: error.message
    });

  }

});


// ==========================================
// REMOVE PIZZA
// ==========================================

router.delete('/:itemId', async function (req, res) {

  try {

    const cart = await Cart.findOne();

    if (!cart) {

      return res.status(404).json({
        message: 'Cart not found'
      });

    }

    const item = cart.items.id(req.params.itemId);

    if (!item) {

      return res.status(404).json({
        message: 'Cart item not found'
      });

    }

    item.deleteOne();

    await cart.save();

    res.status(200).json(cart);

  } catch (error) {

    res.status(500).json({
      message: 'Failed to remove item',
      error: error.message
    });

  }

});


// ==========================================
// CLEAR ENTIRE CART
// ==========================================

router.delete('/', async function (req, res) {

  try {

    let cart = await Cart.findOne();

    if (!cart) {

      cart = await Cart.create({
        items: [],
        ingredients: []
      });

    } else {

      cart.items = [];
      cart.ingredients = [];

      await cart.save();

    }

    res.status(200).json(cart);

  } catch (error) {

    res.status(500).json({
      message: 'Failed to clear cart',
      error: error.message
    });

  }

});


module.exports = router;