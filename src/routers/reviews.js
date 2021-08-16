const express = require('express');

const Review = require('../models/Review');

const {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviews')

const advancedRes = require('../middlewares/advancedRes');

const {
    auth,
    authorize
} = require('../middlewares/auth')

const router = express.Router({
    mergeParams: true
});

router
    .route('/')
    .get(advancedRes(Review), getReviews)
    .post(auth, authorize('user', 'admin'), createReview)

router
    .route('/:id')
    .get(getReview)
    .put(auth, authorize('user', 'admin'), updateReview)
    .delete(auth, authorize('user', 'admin'), deleteReview)
    
module.exports = router