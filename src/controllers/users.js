const express = require('express')

const User = require('../models/User')
const Serving = require('../models/Serving')
const Restaurant = require('../models/Restaurant');
const ErrorResponse = require('../utils/ErrorResponse');

//@Description      sign up user
//@Route            POST /api/v1/user
//@Access           private
exports.createUser = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            role
        } = req.body;
        const user = await User.create({
            name,
            email,
            password,
            role
        });

        const token = await user.generateJWT();

        // replace it with cookie
        res.status(201).json({
            success: true,
            token
        })
    } catch (err) {
        next(err)
    }
}

//@Description      login user
//@Route            POST /api/v1/user/login
//@Access           private
exports.loginUser = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email
        })
        if (!user)
            return next(
                new ErrorResponse(`Ivalid Credintials`, 400)
            );

        const isValid = await user.verifyPassword(password);
        if (!isValid)
            return next(
                new ErrorResponse(`Ivalid Credintials`, 400)
            );
        
        const token = await user.generateJWT();

        // replace it with cookie
        res.status(200).json({
            success: true,
            token
        })
    } catch (err) {
        next(err)
    }
}

//@Description      Get authenticated user account
//@Route            GET /api/v1/user/me
//@Access           private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            data: user
        })

    } catch (err) {
        next(err)
    }
}