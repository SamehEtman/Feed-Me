const express = require('express');
const {
    getRestaurants,
    createRestaurant,
    getRestaurant
} = require('../controllers/restaurants');
const Restaurant = require('../models/Restaurant');


const router = express.Router();

router
    .route('/')
    .get(getRestaurants)
    .post(createRestaurant)

router
    .route('/:id')
    .get(getRestaurant)

module.exports = router;