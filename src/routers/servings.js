const express = require('express');
const {
    getServings,
    createServing,
    updateServing,
    deleteServing
} = require('../controllers/servings');

const {
    auth,
    authorize
} = require('../middlewares/auth')

const advancedRes = require('../middlewares/advancedRes')

const Serving = require('../models/Serving');

const router = express.Router({
    mergeParams: true
});

router
    .route('/')
    .get(advancedRes(Serving, 'restaurant'), getServings)
    .post(auth, authorize('publisher', 'admin'), createServing)

router
    .route('/:id')
    .put(auth, authorize('publisher', 'admin'), updateServing)
    .delete(auth, authorize('publisher', 'admin'), deleteServing)

module.exports = router;