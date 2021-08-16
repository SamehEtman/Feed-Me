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

            
            return res.status(200).json(res.advancedRes)
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
//@Description      get a single serving
//@Route            GET /api/v1/servings/:id
//@Access           public
exports.getServing = async (req, res, next) => {
    try {
        const serving = await Serving.findById(req.params.id);

        res.status(201).json({
            success: true,
            data: serving
        })

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
        req.body.user = req.user._id;


        const restaurant = await Restaurant.findById(req.params.restaurantId);

        if (!restaurant)
            return next(new ErrorResponse(`Restaurant not found`, 404))

        if (restaurant.user.toString() != req.user._id.toString() && req.user.role !== 'admin'){
            return next (
                new ErrorResponse(`Not Authorized` , 401)
            );
        }
        const serving = await Serving.create(req.body);

        res.status(201).json({
            success: true,
            data: serving
        })

    } catch (err) {
        next(err)
    }
}

//@Description      update a serving
//@Route            PUT /api/v1/servings/:id
//@Access           private
exports.updateServing = async (req, res, next) => {
    try {
        let serving = await Serving.findById(req.params.id);

        if (!serving)
            return next(new ErrorResponse(`Serving not found`, 404))

        if (serving.user.toString() != req.user._id.toString() && req.user.role !== 'admin'){
            return next (
                new ErrorResponse(`Not Authorized` , 401)
            );
        }

        serving = await Serving.findByIdAndUpdate(req.params.id , req.body , {
            new : true,
            runValidators :true
        });

        res.status(201).json({
            success: true,
            data: serving
        })

    } catch (err) {
        next(err)
    }
}

//@Description      delete a serving
//@Route            DELETE /api/v1/servings/:id
//@Access           private
exports.deleteServing = async (req, res, next) => {
    try {
        const serving = await Serving.findById(req.params.id);

        if (!serving)
            return next(new ErrorResponse(`Serving not found`, 404))

        if (serving.user.toString() != req.user._id.toString() && req.user.role !== 'admin'){
            return next (
                new ErrorResponse(`Not Authorized` , 401)
            );
        }
        await serving.remove(); 

        res.status(201).json({
            success: true,
            data: serving
        })

    } catch (err) {
        next(err)
    }
}