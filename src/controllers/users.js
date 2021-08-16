const express = require('express')
const crypto = require('crypto')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const Serving = require('../models/Serving')
const Restaurant = require('../models/Restaurant');
const ErrorResponse = require('../utils/ErrorResponse');
const sendEmail = require('../utils/emailSender');

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
            token: ""
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

//@Description      update password details
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
            password: req.body.newPassword
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

//@Description      forgot password
//@Route            POST /api/v1/user/forgotpassword
//@Access           private
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user)
            return next(new ErrorResponse(`Invalid credintials`, 404));

        const resetToken = await user.generateResetPasswordToken();
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetpassword/${resetToken}`;

        const options = {
            email: req.body.email,
            subject: 'Reset Password',
            message: `To restore your password please go to the link below 
            ${resetURL}`,
        }

        sendEmail(options);
        res.status(200).json({
            success: true,
            data: {}
        })

    } catch (err) {
        next(err)
    }
}
//@Description      reset password
//@Route            POST /api/v1/user/resetpassword/:resettoken
//@Access           private
exports.resetPassword = async (req, res, next) => {
    try {

        const resetToken = req.params.resettoken;


        const hashedResetToken = await crypto.createHash('sha256').update(resetToken).digest('hex');
        let user = await User.findOne({
            resetPasswordToken: hashedResetToken,

        })
        if (!user) {
            return next(new ErrorResponse(`User not found`, 404));
        }
        user = await User.findOne({
            resetPasswordToken: hashedResetToken,
            resetPasswordExpire: {
                $gt: Date.now()
            }
        })
        if (!user) {
            return next(new ErrorResponse(`Token expired`, 400))
        }
        const isSame = await bcrypt.compare(req.body.password, user.password);
        if (!isSame)
            user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        sendTokenCookie(user, 201, res);

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
        httpOnly: true
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