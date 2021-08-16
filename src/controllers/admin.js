const express = require('express')
const crypto = require('crypto')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Serving = require('../models/Serving')
const Restaurant = require('../models/Restaurant');
const ErrorResponse = require('../utils/ErrorResponse');


//@Description      Get all users
//@Route            GET /api/v1/admin
//@Access           Private
exports.getUsers = async (req, res, next) => {
    try {
        res.status(200).json(
            res.advancedRes
        );

    } catch (err) {
        next(err)
    }
}


//@Description      Get a single user
//@Route            GET /api/v1/admin/:id
//@Access           Private
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user)
            return next(
                new ErrorResponse(`user not found`, 404)
            );
        res.status(200).json({
            success: true,
            data: user
        })

    } catch (err) {
        next(err)
    }
}

//@Description      create a user
//@Route            POST /api/v1/admin
//@Access           Private
exports.createUser = async (req, res, next) => {
    try {

        const user = await User.create(req.body);

        res.status(200).json({
            success: true,
            data: user
        })

    } catch (err) {
        next(err)
    }
}
//@Description      update a single user
//@Route            PUT /api/v1/admin/:id
//@Access           Private
exports.updateUser = async (req, res, next) => {
    try {

        let user = await User.findById(req.params.id);

        if (!user)
            return next(
                new ErrorResponse(`user not found`, 404)
            );

        user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            success: true,
            data: user
        })

    } catch (err) {
        next(err)
    }
}

//@Description      delete a user
//@Route            DELETE /api/v1/admin/:id
//@Access           Private
exports.deleteUser = async (req, res, next) => {
    try {

        let user = await User.findById(req.params.id);

        if (!user)
            return next(
                new ErrorResponse(`user not found`, 404)
            );

        await user.remove();

        res.status(200).json({
            success: true,
            data: user
        })

    } catch (err) {
        next(err)
    }
}