const mongoose = require('mongoose');
const validator = require('validator');
const ErrorResponse = require('../utils/ErrorResponse');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
    }
}, {
    timestamps: true
})

// generate json web token
userSchema.methods.generateJWT = async function (){
    const token = await jwt.sign({_id : this._id} , process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRE
    })
    return token;
}

// verify password

userSchema.methods.verifyPassword = async function (password){
    return await bcrypt.compare(password , this.password);
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

module.exports = mongoose.model('User', userSchema);