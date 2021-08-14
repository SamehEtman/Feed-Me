const express = require('express');
const {
    getRestaurants,
    createRestaurant,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant
} = require('../controllers/restaurants');

const advancedRes = require('../middlewares/advancedRes')

const Restaurant = require('../models/Restaurant');

const servingRouter = require('./servings')

const router = express.Router({mergeParams : true});

router.use('/:restaurantId/servings' , servingRouter)

router
    .route('/')
    .get(advancedRes (Restaurant , 'servings'), getRestaurants)
    .post(createRestaurant)

router
    .route('/:id')
    .get(getRestaurant)
    .put(updateRestaurant)
    .delete(deleteRestaurant)

module.exports = router;