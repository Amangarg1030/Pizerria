var express = require('express');
var router = express.Router();

const Ingredient = require('../models/Ingredient');

router.get('/',async function(req,res) {
    try {
    const ingredients = await Ingredient.find();
        if (ingredients.length===0){
            return res.status(404).send({message:"ingredients data not found"});
        }
    return res.status(200).json(ingredients);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch ingredients',
      error: error.message
    });
  }
})
module.exports=router;