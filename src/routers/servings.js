const express = require('express');
const {
    getServings,
    createServing
} = require('../controllers/servings');

const Serving = require('../models/Serving');

const router = express.Router({mergeParams : true});

router
    .route('/')
    .get(getServings)
    .post(createServing)

module.exports = router;