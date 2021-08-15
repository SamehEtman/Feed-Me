const express = require('express');

const Serving = require('../models/Serving')
const Restaurant = require('../models/Restaurant');
const ErrorResponse = require('../utils/ErrorResponse');

//@Description      Get all servings
//@Route            GET /api/v1/restaurants/:restaurantId/servings 
//@Route            GET /api/v1/servings
//@Access           Public
exports.getServings = async (req, res, next) => {
    try {

        if (!req.params.restaurantId) {

            const servings = await Serving.find();

            
            return res.status(200).json({
                success: true,
                count: servings.length,
                data: servings
            })
        } else {
            const restaurant = await Restaurant.findById(req.params.restaurantId);
            const servings = await Serving.find({
                restaurant: req.params.restaurantId
            })
           
            res.status(200).json({
                success: true,
                count: servings.length,
                data: servings
            })
        }



    } catch (err) {
        next(err)
    }
}

//@Description      Create a serving
//@Route            POST /api/v1/restaurants/:restaurantId/servings 
//@Access           private
exports.createServing = async (req, res, next) => {
    try {
        req.body.restaurant = req.params.restaurantId;

        const restaurant = await Restaurant.findById(req.params.restaurantId);

        if (!restaurant)
            return next(new ErrorResponse(`Restaurant not found`, 404))

        const serving = await Serving.create(req.body);

        res.status(201).json({
            success: true,
            data: serving
        })

    } catch (err) {
        next(err)
    }
}