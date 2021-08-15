const express = require('express');
const {
    getServings,
    createServing
} = require('../controllers/servings');

const {
    auth,
    authorize
} = require('../middlewares/auth')


const Serving = require('../models/Serving');

const router = express.Router({
    mergeParams: true
});

router
    .route('/')
    .get(getServings)
    .post(auth, authorize('publisher', 'admin'), createServing)

module.exports = router;