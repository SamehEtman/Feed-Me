const express = require('express');
const Restaurant = require('../models/Restaurant');

//@Description      Get all Restaurants
//@Route            GET /api/v1/restaurants
exports.getRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find();

        if (!restaurants)
            return next(new Error(`No Restaurants found`));

        res.status(200).json({
            success: true,
            count: restaurants.length,
            data: restaurants
        })

    } catch (err) {
        console.log(err)
    }
}

//@Description      Get single Restaurans
//@Route            GET /api/v1/restaurants/:id
exports.getRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant)
            return next(new Error(`No Restaurants found`));

        res.status(200).json({
            success: true,
            data : restaurant
        })

    } catch (err) {
        return next(new ErrorResponse(err.message, 404));

    }
}
//@Description      create single Restaurans
//@Route            POST /api/v1/restaurants
exports.createRestaurant = async (req, res, next) => {
    try {
        
        const restaurant = await Restaurant.create(req.body);

        if (!restaurant)
            return next(new Error(`No Restaurants found`));

        res.status(200).json({
            success: true,
            data : restaurant
        })

    } catch (err) {
        return next(new ErrorResponse(err.message, 404));

    }
}