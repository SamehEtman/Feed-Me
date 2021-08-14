const express = require('express');

const ErrorResponse = require('../utils/ErrorResponse')
const Restaurant = require('../models/Restaurant');

//@Description      Get all Restaurants
//@Route            GET /api/v1/restaurants
//@Access           Public
exports.getRestaurants = async (req, res, next) => {
    try {
        res.status(200).json(
            res.advancedRes
        );

    } catch (err) {
        next(err)
    }
}

//@Description      Get single Restaurants
//@Route            GET /api/v1/restaurants/:id
//@Access           Public
exports.getRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate({
            path: 'servings',
            select: 'name price'
        });

        if (!restaurant) {
            return next(new ErrorResponse(`Restaurant not found`, 404));
        }
        res.status(200).json({
            success: true,
            data: restaurant
        });

    } catch (err) {
        next(err);
    }
}

//@Description      Get a Restaurant within a radius (km)
//@Route            GET /api/v1/restaurants/radius?lat=X&lon=Y&radius=Z
//@Access           Public
exports.getRestaurantsWithinRadius = async (req, res, next) => {
    try {
        const {
            lat,
            lon,
            radius
        } = req.query
        console.log(lat, lon, radius)
        if (!lat || !lon || !radius) {
            return next(
                new ErrorResponse("please add all the lat , lon , radius", 400)
            )
        }

        let query =  Restaurant.find({
            location: {
                $near: {
                    $maxDistance: radius * 1000,
                    $geometry: {
                        type: "Point",
                        coordinates: [lat, lon]
                    }
                }
            }
        })

       
        const restaurant = await query.select('name');


        res.status(200).json({
            success: true,
            data: restaurant
        });

    } catch (err) {

        next(err);
    }
}

//@Description      create single Restaurant
//@Route            POST /api/v1/restaurants
//@Access           private
exports.createRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.create(req.body);

        res.status(201).json({
            success: true,
            data: restaurant
        });

    } catch (err) {
        next(err);
    }
}

//@Description      update single Restaurant
//@Route            POST /api/v1/restaurants/:id
//@Access           private
exports.updateRestaurant = async (req, res, next) => {
    try {
        let restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant)
            return next(
                new ErrorResponse(`Restaurant not found`, 404)
            );
        restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            data: restaurant
        });

    } catch (err) {
        next(err);
    }
}

//@Description      delete single Restauran
//@Route            POST /api/v1/restaurants/:id
//@Access           private
exports.deleteRestaurant = async (req, res, next) => {
    try {
        let restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant)
            return next(
                new ErrorResponse(`Restaurant not found`, 404)
            );

        await restaurant.remove()

        res.status(200).json({
            success: true,
            data: restaurant
        });

    } catch (err) {
        next(err);
    }
}