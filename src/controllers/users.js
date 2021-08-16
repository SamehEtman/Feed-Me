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

        sendTokenCookie(user, 201, res);
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

        sendTokenCookie(user, 200, res);

    } catch (err) {
        next(err)
    }
}
//@Description      logout user // clear token
//@Route            POST /api/v1/user/logout
//@Access           private
exports.logoutUser = async (req, res, next) => {
    try {
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10000) // ten seconds
        }).status(200).json({
            success: true,
            token : ""
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


//@Description      update user details
//@Route            PUT /api/v1/user/updatedetails
//@Access           private
exports.updateMe = async (req, res, next) => {
    try {
        const fields = {
            name: req.body.name,
            email: req.body.email
        }
        const user = await User.findByIdAndUpdate(req.user._id, fields, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: user
        })

    } catch (err) {
        next(err)
    }
}

//@Description      password details
//@Route            PUT /api/v1/user/updatepassword
//@Access           private
exports.updatePassword = async (req, res, next) => {
    try {
        // current password ,,, new password
        let user = req.user;

        const isCurrentPasswordValid = await user.verifyPassword(req.body.currentPassword);

        if (!isCurrentPasswordValid) {
            return next(
                new ErrorResponse(`Current password is wrong`, 400)
            );
        }
        const fields = {
            password: req.body.password
        }

        user = await User.findByIdAndUpdate(req.user._id, fields, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: user
        })

    } catch (err) {
        next(err)
    }
}
//@Description      delete user
//@Route            PUT /api/v1/user/delete
//@Access           private
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        await user.remove();

        res.status(200).json({
            success: true,
            data: user
        })

    } catch (err) {
        next(err)
    }
}

const sendTokenCookie = async (user, status, res) => {
    const token = await user.generateJWT();
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly : true
    }
    if (process.env.ENV != 'DEV') {
        options.secure = true
    }
    res
        .cookie('token', token, options)
        .status(status)
        .json({
            success: true,
            token
        })
}