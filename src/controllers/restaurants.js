const express = require('express');
const fs = require('fs')

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
        if (!lat || !lon || !radius) {
            return next(
                new ErrorResponse("please add all the lat , lon , radius", 400)
            )
        }

        let query = Restaurant.findByRadius(lon, lat, radius)


        const restaurant = await query;


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
        req.body.user = req.user._id;
        let restaurant = await Restaurant.findOne({
            user: req.user._id
        })

        if (restaurant && req.user.role !== 'admin') {
            next(new ErrorResponse(`User '${req.user.name}' already published a restaurant`, 401))
        }


        restaurant = await Restaurant.create(req.body);

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
        let restaurant = await Restaurant.findById(
            req.params.id,
        );

        if (!restaurant)
            return next(
                new ErrorResponse(`Restaurant not found`, 404)
            );

        if (restaurant.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return next(
                new ErrorResponse(`Not Authorized`, 401)
            )
        }


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
//@Description      update single Restaurant
//@Route            PUT /api/v1/restaurants/:id/photo
//@Access           private
exports.updatePhotoRestaurant = async (req, res, next) => {
    try {
        let restaurant = await Restaurant.findById(
            req.params.id,
        );

        if (!restaurant)
            return next(
                new ErrorResponse(`Restaurant not found`, 404)
            );

        if (restaurant.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return next(
                new ErrorResponse(`Not Authorized`, 401)
            )
        }
        if (!req.files) {
            return next(new ErrorResponse(`Please upload an image`, 400))
        }

        const file = req.files.file;
        if (!file.mimetype.startsWith('image')) {
            return next(new ErrorResponse(`Please upload an image`, 400))
        }

        const maxSize = 1000000;
        if (file.size > maxSize) {
            return next(new ErrorResponse(`image size must be under 1Mb`, 400))
        }

        file.name = `${restaurant._id.toString()}.${file.mimetype.split('/')[1]}`


        file.mv(`${process.env.UPLOAD_PATH}/${file.name}`,async err => {
            if (err) {
                return next(new ErrorResponse(`problem with file upload`, 500))
            }
            await Restaurant.findByIdAndUpdate(req.params.id, {
                photo: file.name
            })
            res.status(200).json({
                success: true,
                data: file.name
            })
        })


    } catch (err) {
        next(err);
    }
}
//@Description      delete single Restauran
//@Route            POST /api/v1/restaurants/:id
//@Access           private
exports.deleteRestaurant = async (req, res, next) => {
    try {
        let restaurant = await Restaurant.findById(
            req.params.id,
        );

        if (!restaurant)
            return next(
                new ErrorResponse(`Restaurant not found`, 404)
            );

        if (restaurant.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return next(
                new ErrorResponse(`Not Authorized`, 401)
            )
        }
        await restaurant.remove()

        res.status(200).json({
            success: true,
            data: restaurant
        });

    } catch (err) {
        next(err);
    }
}