const express = require('express');

const ErrorResponse = require('../utils/ErrorResponse')
const Restaurant = require('../models/Restaurant');

//@Description      Get all Restaurants
//@Route            GET /api/v1/restaurants
//@Access           Public
exports.getRestaurants = async (req, res, next) => {
    try {
        let query;
        const toRemove = ['select', 'skip', 'limit', 'sort']
        let reqQuery = {
            ...req.query
        };
        toRemove.forEach((key) => {
            delete reqQuery[key];
        })

        console.log(reqQuery);
        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

        query = Restaurant.find(JSON.parse(queryStr)).populate('servings');

        if (req.query.select) {
            const selectFrom = req.query.select.split(',').join(' ');
            query.select(selectFrom);
        }
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query.sort(sortBy);
        }


        const restaurants = await query;

        if (!restaurants) {
            return next(new ErrorResponse(`Restaurants not found`, 404));
        }
        res.status(200).json({
            success: true,
            count: restaurants.length,
            data: restaurants
        });

    } catch (err) {
        next(err)
    }
}

//@Description      Get single Restaurants
//@Route            GET /api/v1/restaurants/:id
//@Access           Public
exports.getRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

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