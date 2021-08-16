const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const ErrorResponse = require('../utils/ErrorResponse');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'please add a name']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please add an email'],
        unique: true,
        validate(value) {
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'publisher'],
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true
})

// generate json web token
userSchema.methods.generateJWT = async function () {
    const token = await jwt.sign({
        _id: this._id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
    return token;
}

userSchema.methods.generateResetPasswordToken = async function () {
    const randomBytes = await crypto.randomBytes(20).toString('hex');

    const hashedBytes = await crypto
        .createHash('sha256')
        .update(randomBytes)
        .digest('hex');
        
    this.resetPasswordToken = hashedBytes;
    this.resetPasswordExpire =  Date.now() + 10 * 60 * 1000;
    await this.save();
    return randomBytes;
}

// verify password

userSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


// hashing password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        console.log('not modified')
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);

    next()
})

// cascade delete restaurants , servings , reviews related
userSchema.pre('remove', async function () {
    await this.model('Restaurant').deleteMany({
        user: this._id
    });
    await this.model('Serving').deleteMany({
        user: this._id
    });
    //await this.model('Review').deleteMany({user : this._id});
    console.log('Deleted related restaurants , servings and reviews')
})


module.exports = mongoose.model('User', userSchema);