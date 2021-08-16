const express = require('express');

const ErrorResponse = require('../utils/ErrorResponse')
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review')

//@Description      Get all Reviews // Get all reviews of a specific restaurant
//@Route            GET /api/v1/reviews
//@Route            GET /api/v1/restaurants/:restaurantId/reviews
//@Access           Public
exports.getReviews = async (req, res, next) => {
    try {
        if (!req.params.restaurantId) {
            res.status(200).json(
                res.advancedRes
            );
        } else {
            const restaurant = await Restaurant.findById(req.params.restaurantId)

            if (!restaurant)
                return next(
                    new ErrorResponse(`Restaurant not found`, 404)
                );
            const reviews = await Review.find({
                restaurant: req.params.restaurantId,
            })
            res.status(200).json({
                success: true,
                count: reviews.length,
                data: reviews
            })

        }


    } catch (err) {
        next(err)
    }
}
//@Description      Get a single review
//@Route            GET /api/v1/reviews/:id
//@Access           Public
exports.getReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id).populate({
            path: 'restaurant',
            select: 'name description'
        });

        if (!review)
            return next(new ErrorResponse(`Review not found`, 404))

        res.status(200).json({
            success: true,
            data: review
        })
    } catch (err) {
        next(err)
    }
}

//@Description      create a review
//@Route            POST /api/v1/restaurants/:restaurantId/reviews
//@Access           private
exports.createReview = async (req, res, next) => {
    try {

        const restaurant = await Restaurant.findById(req.params.restaurantId)

        if (!restaurant)
            return next(new ErrorResponse(`Restaurant not found`, 404));

        req.body.restaurant = req.params.restaurantId;
        req.body.user = req.user._id;

        const review = await Review.create(req.body)

        res.status(201).json({
            success: true,
            data: review
        })
    } catch (err) {
        next(err)
    }
}

//@Description      update a review
//@Route            PUT /api/v1/reviews/:id
//@Access           private
exports.updateReview = async (req, res, next) => {
    try {

        let review = await Review.findById(req.params.id)

        if (!review)
            return next(
                new ErrorResponse(`Review not found`, 404)
            );

        if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return next(
                new ErrorResponse(`Not Authorized`, 401)
            );
        }

        const keys = Object.keys(req.body);
        const allowed = ['title', 'text', 'rating'];

        const isValid = keys.every((key) => {
            return allowed.includes(key);
        })
        if (!isValid)
            return next(
                new ErrorResponse(`Invalid arguments added`, 400)
            );
        for (key in keys) {
            review[key] = req.body[key];
        }

        await review.save();
        res.status(200).json({
            success: true,
            data: review
        })
    } catch (err) {
        next(err)
    }
}
//@Description      delete a review
//@Route            DELETE /api/v1/reviews/:id
//@Access           private
exports.deleteReview = async (req, res, next) => {
    try {

        let review = await Review.findById(req.params.id)

        if (!review)
            return next(
                new ErrorResponse(`Review not found`, 404)
            );

        if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')
            return next(
                new ErrorResponse(`Not Authorized`, 401)
            )
        await review.remove()

        res.status(200).json({
            success: true,
            data: review
        })
    } catch (err) {
        next(err)
    }
}