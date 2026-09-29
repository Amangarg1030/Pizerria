var express = require('express');
var router = express.Router();

const Pizza = require('../models/Pizza');

//get pizza using 
router.get('/',async function(req,res){
    try {
        const pizzas = await Pizza.find();
        if(pizzas.length===0){
            return res.status(404).send({message:"pizza data not found"})
        }
        return res.status(200).send(pizzas);
    } catch (error) {
        res.status(500).json({
      message: 'Failed to fetch pizzas',
      error: error.message
    });
    }
})
module.exports = router;