const express = require('express');
const {
    getRestaurants,
    createRestaurant,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantsWithinRadius
} = require('../controllers/restaurants');

// middlewares 
const advancedRes = require('../middlewares/advancedRes')
const {
    auth,
    authorize
} = require('../middlewares/auth')

const Restaurant = require('../models/Restaurant');

const servingRouter = require('./servings')
reviewRouter = require('./reviews')

const router = express.Router({
    mergeParams: true
});

router.use('/:restaurantId/servings', servingRouter)
router.use('/:restaurantId/reviews', reviewRouter)


router
    .route('/radius')
    .get(getRestaurantsWithinRadius)

router
    .route('/')
    .get(advancedRes(Restaurant, 'servings'), getRestaurants)
    .post(auth, authorize('publisher' ,'admin'), createRestaurant)

router
    .route('/:id')
    .get(getRestaurant)
    .put(auth, authorize('publisher' ,'admin'), updateRestaurant)
    .delete(auth, authorize('publisher' ,'admin'),deleteRestaurant)



module.exports = router;